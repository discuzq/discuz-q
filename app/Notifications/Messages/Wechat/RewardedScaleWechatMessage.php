<?php

namespace App\Notifications\Messages\Wechat;

use App\Models\NotificationTiming;
use App\Models\Order;
use App\Models\Thread;
use App\Models\User;
use Discuz\Notifications\Messages\SimpleMessage;
use Illuminate\Contracts\Routing\UrlGenerator;

/**
 * 内容支付分成通知 - 微信
 *
 * @package App\Notifications\Messages\Wechat
 */
class RewardedScaleWechatMessage extends SimpleMessage
{
    /**
     * @var Order $order
     */
    protected $order;

    /**
     * @var User $user
     */
    protected $user;

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
        [$firstData, $user, $order, $data] = $parameters;
        // set parent tpl data
        $this->firstData = $firstData;

        $this->user = $user;
        $this->order = $order;
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

        switch ($this->data['notify_type']) {
            default:
            case 'paid_site':
                // 付费站点加入
                $user = $this->order->user;
                $title = '注册站点';
                break;
            case 'paid_reward': // 打赏
            case 'paid_thread': // 付费主题
            case 'paid_attachment': // 附件付费
                $user = $this->order->payee;
                $title = $this->order->thread->getContentByType(Thread::CONTENT_LENGTH, true); // thread_title
                break;
        }

        // 获取支付类型
        $orderTypeName = Order::enumType($this->order->type, function ($args) {
            return $args['value'];
        });

        /**
         * 设置父类 模板数据
         * @parem $user_name 支付人（用户名）
         * @parem $nick_name 支付人（昵称）
         * @parem $order_sn 订单编号
         * @parem $payment_sn 支付编号
         * @parem $order_type_name 订单支付类型 (注册/打赏/付费主题/付费附件)
         * @parem $boss_amount 上级实际分成金额
         * @parem $title 主题标题/注册站点 (如果是注册站点，该字段是"注册站点")
         * @parem $notification_num 通知条数
         */
        $this->setTemplateData([
            '{$user_name}'       => $user->username,
            '{$nick_name}'       => $user->nickname,
            '{$order_sn}'        => $this->order->order_sn,
            '{$payment_sn}'      => $this->order->payment_sn,
            '{$order_type_name}' => $orderTypeName,
            '{$boss_amount}'     => $this->order->calculateAuthorAmount(),
            '{$title}'           => $this->strWords($title),
            '{$notification_num}'    => NotificationTiming::getLastNotificationNum($noticeId, $receiveUserId),
        ]);

        // build data
        $expand = [
            'redirect_url' => $this->url->to('/topic/index?id=' . $this->order->thread_id),
        ];

        return $this->compiledArray($expand);
    }

}
