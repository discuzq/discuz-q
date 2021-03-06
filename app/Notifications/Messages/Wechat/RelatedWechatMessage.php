<?php

namespace App\Notifications\Messages\Wechat;

use App\Models\NotificationTiming;
use App\Models\Post;
use App\Models\Thread;
use App\Models\User;
use Discuz\Notifications\Messages\SimpleMessage;
use Illuminate\Contracts\Routing\UrlGenerator;

/**
 * @通知 - 微信
 *
 * Class RelatedWechatMessage
 *
 * @package App\Notifications\Messages\Wechat
 */
class RelatedWechatMessage extends SimpleMessage
{
    /**
     * @var Post $post
     */
    protected $post;

    /**
     * @var User $actor
     */
    protected $actor;

    protected $data;

    /**
     * @var UrlGenerator
     */
    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    public function setData(...$parameters)
    {
        [$firstData, $actor, $post, $data] = $parameters;
        // set parent tpl data
        $this->firstData = $firstData;

        $this->actor = $actor;
        $this->post = $post;
        $this->data = $data;

        $this->template();
    }

    public function template()
    {
        return ['content' => $this->getWechatContent()];
    }

    protected function titleReplaceVars()
    {
        return [];
    }

    public function contentReplaceVars($data)
    {
        $noticeId = !empty($this->data['noticeId']) ? $this->data['noticeId'] : '';
        $receiveUserId = !empty($this->data['receiveUserId']) ? $this->data['receiveUserId'] : 0;

        $content = $this->post->getSummaryContent(Post::NOTICE_LENGTH, true);
        $postContent = $content['content'];         // 去除@样式的 html 标签
        $threadTitle = $this->post->thread->getContentByType(Thread::CONTENT_LENGTH, true);
        $threadPostContent = $content['first_content'];

        /**
         * 设置父类 模板数据
         * @parem $user_id 发送人用户ID
         * @parem $user_name 发送人姓名（用户名）
         * @parem $nick_name 发送人姓名（昵称）
         * @parem $post_content @源帖子内容
         * @parem $thread_id 主题ID
         * @parem $thread_title 主题标题/首帖内容 (如果有title是title，没有则是首帖内容)
         * @parem $notification_num 通知条数
         */
        $this->setTemplateData([
            '{$user_id}'             => $this->actor->id,
            '{$user_name}'           => $this->actor->username,
            '{$nick_name}'           => $this->actor->nickname,
            '{$post_content}'        => $this->strWords($postContent),
            '{$thread_id}'           => $this->post->thread_id,
            '{$thread_title}'        => $this->strWords($threadTitle),
            '{$notification_num}'    => NotificationTiming::getLastNotificationNum($noticeId, $receiveUserId),
        ]);

        // redirect_url TODO 判断 $replyPostId 是否是楼中楼 跳转楼中楼详情页
        $replyPostId = $this->post->reply_post_id;  // 楼中楼时不为 0

        // build data
        $expand = [
            'redirect_url' => $this->url->to('/topic/index?id=' . $this->post->thread_id),
        ];

        return $this->compiledArray($expand);
    }

}
