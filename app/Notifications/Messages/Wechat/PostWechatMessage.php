<?php

namespace App\Notifications\Messages\Wechat;

use App\Models\Post;
use App\Models\Thread;
use App\Notifications\Messages\Database\PostMessage;
use Discuz\Notifications\Messages\SimpleMessage;
use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Support\Arr;

/**
 * Post 通知 - 微信
 */
class PostWechatMessage extends SimpleMessage
{
    protected $actor;

    protected $data;

    /**
     * @var Post $post
     */
    protected $post;

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
        [$firstData, $actor, $data] = $parameters;
        // set parent tpl data
        $this->firstData = $firstData;
        $this->actor = $actor;
        $this->data = $data;

        // set post model
        if (isset($this->data['post'])) {
            $this->post = $data['post'];
            $this->template();
        }
    }

    public function template()
    {
        return ['content' => $this->getWechatContent($this->data)];
    }

    protected function titleReplaceVars()
    {
        return [];
    }

    public function contentReplaceVars($data)
    {
        $threadPostContent = $this->post->getSummaryContent(Post::NOTICE_LENGTH, true)['first_content'];
        $threadTitle = $this->post->thread->getContentByType(Thread::CONTENT_LENGTH, true);

        /**
         * 设置父类 模板数据
         * @parem $user_name 帖子创建人
         * @parem $actor_name 当前操作人(一般为管理员)
         * @parem $message_change 修改帖子的内容
         * @parem $thread_title 主题标题/首贴内容 (如果有title是title，没有则是首帖内容)
         * @parem $thread_post_content 首贴内容
         * @parem $reason 原因
         */
        $this->setTemplateData([
            '{$user_name}' => $this->post->user->username,
            '{$actor_name}' => $this->actor->username,
            '{$message_change}' => $this->strWords(Arr::get($data, 'message', '')),
            '{$thread_title}' => $this->strWords($threadTitle),
            '{$thread_post_content}' => $this->strWords($threadPostContent),
            '{$reason}' => Arr::get($data, 'refuse', '无'),
        ]);

        // build data
        $build = $this->compiledArray();

        // redirect_url
        // 判断如果是删除通知，帖子被删除后无法跳转到详情页，threadId 清空跳主页
        if ($data['notify_type'] == PostMessage::NOTIFY_DELETE_TYPE) {
            $redirectUrl = '';
        } else {
            $redirectUrl = '/topic/index?id=' . $this->post->thread_id;
        }
        if (! empty($this->firstData->redirect_url)) {
            $redirectUrl = $this->firstData->redirect_url;
        }
        $build['redirect_url'] = $this->url->to($redirectUrl);

        return $build;
    }

}
