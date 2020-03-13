<?php

namespace App\Listeners\User;

use App\Events\Users\Registered;
use App\MessageTemplate\Wechat\WechatRegisterMessage;
use App\Notifications\System;

/**
 * 通知行为 - 微信通知
 *
 * Class WechatNotifications
 * @package App\Listeners\User
 */
class WechatNotifications
{
    public function handle(Registered $event)
    {
        $event->user->notify(new System(WechatRegisterMessage::class));
    }
}
