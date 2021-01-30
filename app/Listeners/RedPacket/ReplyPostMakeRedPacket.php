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

namespace App\Listeners\RedPacket;

use App\Commands\RedPacket\ReceiveRedPacket;
use App\Events\Post\Saved;
use App\Models\Thread;
use App\Models\Post;
use App\Models\RedPacket;
use App\Models\UserWalletLog;
use Discuz\Foundation\EventsDispatchTrait;
use Exception;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Database\ConnectionInterface;

class ReplyPostMakeRedPacket
{
    use EventsDispatchTrait;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @var ConnectionInterface
     */
    protected $connection;

    public function __construct(Dispatcher $bus, ConnectionInterface $connection)
    {
        $this->bus = $bus;
        $this->connection = $connection;
    }

    /**
     * @param Saved $event
     * @throws Exception
     */
    public function handle(Saved $event)
    {

        $post = $event->post;
        $actor = $event->actor;
        $data = $event->data;
        $type = $event->post->getRelations()['thread']['type'];
        $info = '访问用户id： ' . $actor->id.
                ',访问帖子id：' . $post->thread->id.
                ',post_id：'   . $post->id.
                ',msg：';

        if (!($type == Thread::TYPE_OF_TEXT || $type == Thread::TYPE_OF_LONG)) {
            app('log')->info($info . '回复领红包：该帖不为文字帖和长文贴');
            return;
        }

        if ($post->is_approved == Post::UNAPPROVED) {
            app('log')->info($info . '回复领红包：该帖未审核');
            return;
        }

        if ($post->is_first == 1 || $post->is_comment == 1 || $post->wasRecentlyCreated == false) {
            app('log')->info($info . '回复领红包：该帖不为首帖、第一条评论');
            return;
        }

        $redPacket = RedPacket::query() ->where(['thread_id' => $post->thread_id, 'status' => 1, 'condition' => 0])
                                        ->first();
        if (empty($redPacket) || empty($redPacket['remain_money']) || empty($redPacket['remain_number'])) {
            app('log')->info($info . '回复领红包：该红包帖无剩余金额和个数');
            return;
        }

        //领取过红包的用户不再领取
        $currentPostUser = Post::query()->where(['id' => $post->id])->first();
        $thread = Thread::query()->where(['id' => $currentPostUser['thread_id']])->first();
        if ($thread['type'] == Thread::TYPE_OF_TEXT) {
            $change_type = UserWalletLog::TYPE_INCOME_TEXT;
        } else {
            $change_type = UserWalletLog::TYPE_INCOME_LONG;
        }
        $isReceive = UserWalletLog::query()->where([
            'user_id' => $actor['id'],
            'change_type' => $change_type,
            'thread_id' => $thread['id']
        ])->first();
        if (!empty($isReceive)) {
            app('log')->info($info . '回复领红包：该用户已经领取过红包了');
            return;
        }

        $this->bus->dispatch(new ReceiveRedPacket($thread,$post,$redPacket,$event->post->thread->user,$actor));

    }
}