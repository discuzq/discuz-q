<?php

/**
 * Discuz & Tencent Cloud
 * This is NOT a freeware, use is subject to license terms
 */

namespace App\Listeners\Post;

use App\Events\Post\Created;
use App\Events\Post\Deleted;
use App\Events\Post\Hidden;
use App\Events\Post\PostWasApproved;
use App\Events\Post\Restored;
use App\Events\Post\Revised;
use App\Events\Post\Saved;
use App\Events\Post\Saving;
use App\Listeners\User\CheckPublish;
use App\MessageTemplate\PostMessage;
use App\MessageTemplate\RepliedMessage;
use App\MessageTemplate\Wechat\WechatPostMessage;
use App\MessageTemplate\Wechat\WechatRepliedMessage;
use App\Models\Attachment;
use App\Models\Post;
use App\Models\PostMod;
use App\Models\Thread;
use App\Models\ThreadTopic;
use App\Models\UserActionLogs;
use App\Notifications\Replied;
use App\Notifications\System;
use App\Traits\PostNoticesTrait;
use Discuz\Api\Events\Serializing;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Auth\Exception\PermissionDeniedException;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class PostListener
{
    use AssertPermissionTrait;
    use PostNoticesTrait;

    public function subscribe(Dispatcher $events)
    {
        // 发表回复
        $events->listen(Saving::class, CheckPublish::class);
        $events->listen(Saving::class, [$this, 'whenPostWasSaving']);
        $events->listen(Created::class, [$this, 'whenPostWasCreated']);
        $events->listen(Created::class, SaveAudioToDatabase::class);

        // 审核回复
        $events->listen(PostWasApproved::class, [$this, 'whenPostWasApproved']);

        // 隐藏/还原回复
        $events->listen(Hidden::class, [$this, 'whenPostWasHidden']);
        $events->listen(Restored::class, [$this, 'whenPostWasRestored']);

        // 删除首帖
        $events->listen(Deleted::class, [$this, 'whenPostWasDeleted']);

        // 修改内容
        $events->listen(Revised::class, [$this, 'whenPostWasRevised']);

        // 喜欢帖子
        $events->listen(Serializing::class, AddPostLikeAttribute::class);
        $events->subscribe(SaveLikesToDatabase::class);

        // 添加完数据后
        $events->listen(Saved::class, [$this, 'whenPostWasSaved']);

        // @
        $events->listen(Saved::class, [$this, 'userMentions']);

        // #话题#
        $events->listen(Saved::class, [$this, 'threadTopic']);
    }

    /**
     * @param Saving $event
     * @throws PermissionDeniedException
     */
    public function whenPostWasSaving(Saving $event)
    {
        $post = $event->post;
        $actor = $event->actor;

        // 是否有权限在该主题所在分类下回复
        if (! $post->exists && ! $post->is_first && $actor->cannot('replyThread', $post->thread->category)) {
            throw new PermissionDeniedException;
        }
    }

    /**
     * 发送通知
     *
     * @param Created $event
     */
    public function whenPostWasCreated(Created $event)
    {
        $post = $event->post;
        $actor = $event->actor;

        if ($post->is_approved == Post::APPROVED) {
            // 如果当前用户不是主题作者，也是合法的，则通知主题作者
            if ($post->thread->user_id != $actor->id) {
                // 数据库通知
                $post->thread->user->notify(new Replied($post, $actor, RepliedMessage::class));

                // 微信通知
                $post->thread->user->notify(new Replied($post, $actor, WechatRepliedMessage::class, [
                    'message' => $post->getSummaryContent(Post::NOTICE_LENGTH, true)['content'],
                    'subject' => $post->getSummaryContent(Post::NOTICE_LENGTH, true)['first_content'],
                    'raw' => array_merge(Arr::only($post->toArray(), ['id', 'thread_id', 'reply_post_id']), [
                        'actor_username' => $actor->username    // 发送人姓名
                    ]),
                ]));
            }

            // 如果被回复的用户不是当前用户，也不是主题作者，也是合法的，则通知被回复的人
            if (
                $post->reply_post_id
                && $post->reply_user_id != $actor->id
                && $post->reply_user_id != $post->thread->user_id
            ) {
                // 数据库通知
                $post->replyUser->notify(new Replied($post, $actor, RepliedMessage::class));

                // 去掉回复引用
                $post->replyPost->filterPostContent(Post::NOTICE_LENGTH);

                // 微信通知
                $post->replyUser->notify(new Replied($post, $actor, WechatRepliedMessage::class, [
                    'message' => $post->getSummaryContent(Post::NOTICE_LENGTH, true)['content'],
                    'subject' => $post->replyPost->formatContent(), // 解析content
                    'raw' => array_merge(Arr::only($post->toArray(), ['id', 'thread_id', 'reply_post_id']), [
                        'actor_username' => $actor->username    // 发送人姓名
                    ]),
                ]));
            }
        }
    }

    /**
     * 绑定附件 & 刷新被回复数
     *
     * @param Saved $event
     * @throws PermissionDeniedException
     */
    public function whenPostWasSaved(Saved $event)
    {
        $post = $event->post;
        $actor = $event->actor;

        // 绑定附件
        if ($attachments = Arr::get($event->data, 'relationships.attachments.data')) {
            if (! $post->wasRecentlyCreated) {
                $this->assertCan($actor, 'edit', $post);
            }

            $ids = array_column($attachments, 'id');

            // 判断附件是否合法
            $bool = Attachment::approvedInExists($ids);
            if ($bool) {
                // 如果是首贴，将主题设为待审核
                if ($post->is_first) {
                    $post->thread->is_approved = Thread::UNAPPROVED;
                }
                $post->is_approved = Post::UNAPPROVED;
            }

            Attachment::query()
                ->where('user_id', $actor->id)
                ->where('type_id', 0)
                ->whereIn('id', $ids)
                ->update(['type_id' => $post->id]);
        }

        // 刷新主题回复数、最后一条回复
        $thread = $post->thread;

        if ($thread && $thread->exists) {
            $thread->refreshPostCount();
            $thread->refreshLastPost();
            $thread->save();
        }

        // 刷新被回复数
        if ($replyId = $post->reply_post_id) {
            // 回复以及修改、批量修改 全都刷新回复数
            $post = Post::find($replyId);
            $post->refreshReplyCount();
            $post->save();
        }
    }

    /**
     * @param PostWasApproved $event
     */
    public function whenPostWasApproved(PostWasApproved $event)
    {
        $post = $event->post;

        if ($post->is_approved === Post::APPROVED) {
            // 审核通过时，清除记录的敏感词
            PostMod::query()->where('post_id', $post->id)->delete();

            $action = 'approve';
        } elseif ($post->is_approved == Thread::IGNORED) {
            $action = 'ignore';
        } else {
            $action = 'disapprove';
        }

        // 通知
        $this->postNotices($post, $event->actor, 'isApproved', $event->data['message'] ?? '');

        // 日志
        UserActionLogs::writeLog($event->actor, $post, $action, $event->data['message'] ?? '');
    }

    /**
     * 隐藏回复时
     *
     * @param Hidden $event
     */
    public function whenPostWasHidden(Hidden $event)
    {
        $post = $event->post;

        if ($post->is_first) {
            $post->thread->deleted_at = $post->deleted_at;

            $post->thread->save();
        }

        // 通知
        $this->postNotices($post, $event->actor, 'isDeleted', $event->data['message'] ?? '');

        // 日志
        UserActionLogs::writeLog($event->actor, $post, 'hide', $event->data['message'] ?? '');
    }

    /**
     * 还原回复时
     *
     * @param Restored $event
     */
    public function whenPostWasRestored(Restored $event)
    {
        $post = $event->post;

        if ($post->is_first) {
            $post->thread->deleted_at = null;

            $post->thread->save();
        }
    }

    /**
     * TODO: 删除附件
     * 如果删除的是首帖，同时删除主题及主题下所有回复
     *
     * @param Deleted $event
     */
    public function whenPostWasDeleted(Deleted $event)
    {
        if ($event->post->is_first) {
            Thread::where('id', $event->post->thread_id)->delete();

            Post::where('thread_id', $event->post->thread_id)->delete();
        }
    }

    /**
     * 修改内容时，记录操作
     *
     * @param Revised $event
     */
    public function whenPostWasRevised(Revised $event)
    {
        UserActionLogs::writeLog(
            $event->actor,
            $event->post,
            'revise',
            $event->actor->username . ' 修改了内容'
        );

        if ($event->post->user) {
            // 判断是否是自己
            if ($event->actor->id != $event->post->user->id) {
                $build = [
                    'message' => $event->post->content,
                    'raw' => Arr::only($event->post->toArray(), ['id', 'thread_id', 'is_first'])
                ];
                // 系统通知
                $event->post->user->notify(new System(PostMessage::class, $build));

                // 微信通知
                $event->post->user->notify(new System(WechatPostMessage::class, $build));
            }
        }
    }

    /**
     * @param Saved $event
     */
    public function userMentions(Saved $event)
    {
        // 任何修改帖子行为 除了修改是否合法字段,其它都不允许发送@通知
        $edit = Arr::get($event->data, 'edit', false);

        if ($edit) {
            // 判断是否修改合法值
            if (!Arr::has($event->data, 'attributes.isApproved')) {
                return;
            }
            // 判断是否合法
            if (Arr::get($event->data, 'attributes.isApproved') != Thread::APPROVED) {
                return;
            }
        } else {
            // 判断是否是合法的主题
            if ($event->post->thread->is_approved != Thread::APPROVED) {
                return;
            }

            // 判断是否是合法的回复
            if ($event->post->is_approved != Post::APPROVED) {
                return;
            }
        }

        // 发送@通知
        $this->sendRelated($event->post, $event->post->user);
    }

    /**
     * 解析话题、创建话题、存储话题主题关系、修改话题主题数/阅读数
     * @param Saved $event
     */
    public function threadTopic(Saved $event)
    {
        ThreadTopic::setThreadTopic($event->post);
    }
}
