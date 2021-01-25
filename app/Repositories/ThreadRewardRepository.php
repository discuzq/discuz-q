<?php

/**
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace App\Repositories;

use App\Models\Thread;
use App\Models\ThreadReward;
use App\Models\User;
use App\Models\Order;
use App\Api\Serializer\ThreadSerializer;
use App\Api\Serializer\UserSerializer;
use Discuz\Foundation\AbstractRepository;
use Discuz\SpecialChar\SpecialCharServer;
use Illuminate\Support\Arr;
use App\Notifications\Messages\Wechat\ThreadRewardedWechatMessage;
use App\Notifications\Messages\Wechat\ThreadRewardedExpiredWechatMessage;
use App\Notifications\ThreadRewarded;
use Tobscure\JsonApi\Relationship;
use Discuz\Api\Serializer\AbstractSerializer;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;
use Illuminate\Database\Eloquent\Model;

class ThreadRewardRepository extends AbstractRepository
{
    /**
     * Find a thread by ID, optionally making sure it is visible to a
     * certain user, or throw an exception.
     *
     * @param int $id
     * @param User|null $actor
     * @return Thread
     */
    public function returnThreadRewardNotify($thread_id, $user_id, $rewards, $type)
    {
        $query = Thread::query();
        $query->join('posts', 'threads.id', '=', 'posts.thread_id')->where(['posts.is_first' => 1, 'posts.is_comment' => 0]);
        $query->where(['threads.id' => $thread_id]);
        $thread = $query->first();

        $order = Order::query()->where(['thread_id' => $thread_id])->first();
        $actorUser = User::query()->where(['id' => $thread->user_id])->first();
        $user = User::query()->where(['id' => $user_id])->first();
        $orderArr = empty($order) ? array() : $order->toArray();

        if(!empty($thread)){
            $threadContent = $this->getContentByType($thread, Thread::CONTENT_LENGTH, true);
        }else{
            $threadContent = '悬赏帖已过期且已被删除，返回冻结金额';
        }


        $build = [
            'message' => $threadContent,
            'raw' => array_merge(Arr::only($orderArr, ['id', 'thread_id', 'type']), [
                'actor_username' => $actorUser->username,   // 发送人姓名
                'actual_amount' => $rewards,     // 获取作者实际金额
                'title' => $thread->title,
                'content' => (string)$threadContent,
                'created_at' => (string)$thread->created_at
            ]),
        ];

        $walletType = $type;
        // Tag 发送悬赏问答通知
        $user->notify(new ThreadRewarded(ThreadRewardedWechatMessage::class, $user, $order, $build, $walletType));
    }

    /**
     * 根据类型获取 Thread content
     *
     * @param int $substr
     * @param bool $parse
     * @return Stringable|string
     */
    public function getContentByType($thread, $substr, $parse = false)
    {
        $special = app(SpecialCharServer::class);

        if ($thread->type == 1) {
            $content = $substr ? Str::of($thread->title)->substr(0, $substr) : $thread->title;
            $content = $special->purify($content);
        } else {
            // 不是长文没有标题则使用首贴内容
            $thread->content = $substr ? Str::of($thread->content)->substr(0, $substr) : $thread->content;
            $content = $thread->content;
        }

        return $content;
    }
}
