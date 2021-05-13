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

use App\Common\PermissionKey;
use App\Models\Attachment;
use App\Models\Group;
use App\Models\Thread;
use App\Models\User;
use Discuz\Foundation\AbstractRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository extends AbstractRepository
{
    /**
     * Get a new query builder for the users table.
     *
     * @return Builder
     */
    public function query()
    {
        return User::query();
    }

    /**
     * Find a user by ID, optionally making sure it is visible to a certain
     * user, or throw an exception.
     *
     * @param int $id
     * @param User $actor
     * @return Builder|\Illuminate\Database\Eloquent\Model|User
     *
     * @throws ModelNotFoundException
     */
    public function findOrFail($id, User $actor = null)
    {
        $query = User::where('id', $id);

        return $this->scopeVisibleTo($query, $actor)->firstOrFail();
    }

    /**
     * Find a user by an identification (username or phone number).
     *
     * @param array $param
     * @return User|null
     */
    public function findByIdentification($param)
    {
        return User::where($param)->first();
    }

    /**
     * 检查 switch.XXX && (XXX || categoryX.XXX) 的权限
     *
     * @param User $user
     * @param string $ability
     * @param null $categoryId
     * @return bool
     */
    private function checkCategoryPermission(User $user, string $ability, $categoryId = null)
    {
        $abilities = [$ability];

        if ($categoryId) {
            $abilities[] = 'category'.$categoryId.'.'.$ability;
        }

        return $user->hasPermission('switch.'.$ability) && $user->hasPermission($abilities, false);
    }

    /**
     * 发帖权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canCreateThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::CREATE_THREAD, $categoryId);
    }

    /**
     * 发帖插入图片权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertImageToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_IMAGE, $categoryId);
    }

    /**
     * 发帖插入视频权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertVideoToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_VIDEO, $categoryId);
    }

    /**
     * 发帖插入音频权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertAudioToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_AUDIO, $categoryId);
    }

    /**
     * 发帖插入附件权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertAttachmentToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_ATTACHMENT, $categoryId);
    }

    public function canDeleteAttachment(User $user, $attachment, array $requestData)
    {
        if ($attachment->user_id == $user->id || $user->isAdmin()) {
            return true;
        }

        // 有权编辑帖子时，允许删除帖子下的附件
        $postAttachmentTypes = [
            Attachment::TYPE_OF_FILE,
            Attachment::TYPE_OF_IMAGE,
            Attachment::TYPE_OF_AUDIO,
            Attachment::TYPE_OF_VIDEO,
        ];

        if (in_array($attachment->type, $postAttachmentTypes) && $this->canEditPost($user, $attachment->post, $requestData)) {
            return true;
        }
    }

    /**
     * 发帖插入商品权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertGoodsToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_GOODS, $categoryId);
    }

    /**
     * 发帖插入付费权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertPayToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_PAY, $categoryId);
    }

    /**
     * 发帖插入悬赏权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertRewardToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_REWARD, $categoryId);
    }

    /**
     * 发帖插入红包权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertRedPacketToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_RED_PACKET, $categoryId);
    }

    /**
     * 发帖插入位置权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertPositionToThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_POSITION, $categoryId);
    }

    /**
     * 匿名发帖权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canCreateThreadAnonymous(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_ALLOW_ANONYMOUS, $categoryId);
    }

    /**
     * 查看帖子权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canViewThreads(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::VIEW_THREADS, $categoryId);
    }

    /**
     * 免费查看付费帖子权限
     *
     * @param User $user
     * @return bool
     */
    public function canFreeViewPosts(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_FREE_VIEW_POSTS);
    }

    /**
     * 收藏帖子权限
     *
     * @param User $user
     * @return bool
     */
    public function canFavoriteThread(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_FAVORITE);
    }

    /**
     * 帖子点赞权限
     *
     * @param User $user
     * @return bool
     */
    public function canLikePosts(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_LIKE_POSTS);
    }

    /**
     * 帖子加精权限
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canEssenceThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_ESSENCE, $categoryId);
    }

    /**
     * 帖子置顶权限
     *
     * @param User $user
     * @return bool
     */
    public function canStickThread(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_STICKY);
    }

    /**
     * 编辑帖子权限
     *
     * @param User $user
     * @param $thread
     * @return bool
     */
    public function canEditThread(User $user, $thread)
    {
        // 是作者本人，且有编辑自己帖子权限或者是草稿
        if (
            ($thread->user_id == $user->id)
            && ($this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT_OWN, $thread->category_id) || $thread->is_draft)
        ) {
            return true;
        }

        return $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT, $thread->category_id);
    }

    /**
     * 前台删除帖子权限
     *
     * @param User $user
     * @param $thread
     * @return bool
     */
    public function canHideThread(User $user, $thread)
    {
        return ($user->id === $thread->user_id && $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE_OWN, $thread->category_id))
            || $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE, $thread->category_id);
    }

    /**
     * 回复帖子权限
     *
     * @param User $user
     * @param $categoryId
     * @return bool
     */
    public function canReplyThread(User $user, $categoryId)
    {
        return $this->checkCategoryPermission($user, PermissionKey::VIEW_THREADS, $categoryId)
            && $this->checkCategoryPermission($user, PermissionKey::THREAD_REPLY, $categoryId);
    }

    /**
     * 查看帖子权限
     *
     * @param User $user
     * @param $thread
     * @param $httpReferer
     * @param array $requestData
     * @return bool
     */
    public function canViewPosts(User $user, $thread, $httpReferer, array $requestData)
    {
        if (
            $thread->user_id == $user->id
            && $thread->is_approved == Thread::APPROVED
            && (!$thread->deleted_at || $thread->deleted_user_id == $user->id)
        ) {
            return true;
        }

        if (strstr($httpReferer, 'postpay') || (strstr($httpReferer, 'post') && strstr($httpReferer, 'operating=edit'))) {
            return $this->canEditThread($user, $thread, $requestData);
        }

        return $this->checkCategoryPermission($user, PermissionKey::THREAD_VIEW_POSTS, $thread->category_id);
    }

    public function canViewThreadDetail(User $user, $thread)
    {
        if ($user->id == $thread->user_id) {
            return true;
        }
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_VIEW_POSTS, $thread->category_id);
    }

    /**
     * 编辑回复权限
     *
     * @param User $user
     * @param $post
     * @param array $requestData
     * @return bool
     */
    public function canEditPost(User $user, $post, array $requestData)
    {
        // 首帖按主题权限走
        if ($post->is_first) {
            return $this->canEditThread($user, $post->thread, $requestData);
        }

        // 是作者本人且拥有编辑自己主题或回复的权限
        if ($post->user_id == $user->id && $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT_OWN, $post->thread->category_id)) {
            return true;
        }

        return $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT_POSTS, $post->thread->category_id);
    }

    public function canViewListWallet(User $user)
    {
        return $user->hasPermission(PermissionKey::WALLET_VIEW_LIST);
    }

    public function canViewListLogs(User $user)
    {
        return $user->hasPermission(PermissionKey::WALLET_LOGS_VIEW_LIST);
    }

    public function canViewListCash(User $user)
    {
        return $user->hasPermission(PermissionKey::CASH_VIEW_LIST);
    }

    /**
     * 删除回复权限
     *
     * @param User $user
     * @param $post
     * @param array $requestData
     * @return bool
     */
    public function canHidePost(User $user, $post, array $requestData)
    {
        // 首帖按主题权限走
        if ($post->is_first) {
            return $this->canEditThread($user, $post->thread, $requestData);
        }

        // 是作者本人且拥有编辑自己主题或回复的权限
        if ($post->user_id == $user->id && $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE_OWN, $post->thread->category_id)) {
            return true;
        }

        return $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE_POSTS, $post->thread->category_id);
    }

    /**
     * 删除用户组权限
     *
     * @param User $user
     * @param Group $group
     * @return bool
     */
    public function canDeleteGroup(User $user, Group $group)
    {
        $groups = [
            Group::ADMINISTRATOR_ID,
            Group::BAN_ID,
            Group::UNPAID,
            Group::GUEST_ID,
            Group::MEMBER_ID,
        ];

        return !in_array($group->id, $groups) && $user->isAdmin();
    }

    public function canCreateGroup(User $user)
    {
        return $user->isAdmin();
    }

    public function canEditGroup(User $user)
    {
        return $user->isAdmin();
    }

    public function canCreateInvite(User $user)
    {
        return $user->hasPermission(PermissionKey::CREATE_INVITE);
    }

    public function canDeleteInvite(User $user, $invite)
    {
        return $this->canCreateInvite($user) && ($invite->user_id == $user->id || $user->isAdmin());
    }

    /**
     * 下单权限
     *
     * @param User $user
     * @return bool
     */
    public function canCreateOrder(User $user)
    {
        return $user->hasPermission(PermissionKey::ORDER_CREATE);
    }

    public function canPayOrder(User $user)
    {
        return $user->hasPermission(PermissionKey::TRADE_PAY_ORDER);
    }

    public function canCreateStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canDeleteStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canExportStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canViewStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canEditStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canWalletPay(User $user)
    {
        return $user->status == 0 && $user->pay_password;
    }

    public function canCreateDialog(User $user)
    {
        return $user->hasPermission(PermissionKey::DIALOG_CREATE);
    }

    public function canCreateCash(User $user)
    {
        return $user->hasPermission(PermissionKey::CASH_CREATE);
    }

    public function canEditUserGroup(User $user)
    {
        return $user->hasPermission(PermissionKey::USER_EDIT_GROUP);
    }

    public function canEditUserStatus(User $user)
    {
        return $user->hasPermission(PermissionKey::USER_EDIT_STATUS);
    }

    public function canViewUser(User $user)
    {
        return $user->hasPermission(PermissionKey::USER_VIEW);
    }

    public function canFollowUser(User $user)
    {
        return $user->hasPermission(PermissionKey::USER_FOLLOW_CREATE);
    }
}
