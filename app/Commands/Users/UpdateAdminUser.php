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

namespace App\Commands\Users;

use App\Censor\Censor;
use App\Censor\CensorNotPassedException;
use App\Events\Group\PaidGroup;
use App\Events\Users\ChangeUserStatus;
use App\Events\Users\PayPasswordChanged;
use App\Exceptions\TranslatorException;
use App\Models\Group;
use App\Models\GroupPaidUser;
use App\Models\GroupUser;
use App\Models\GroupUserMq;
use App\Models\Order;
use App\Models\User;
use App\Common\ResponseCode;
use App\Models\UserActionLogs;
use App\Models\AdminActionLog;
use App\Notifications\Messages\Database\GroupMessage;
use App\Notifications\System;
use App\Repositories\UserRepository;
use App\Validators\UserValidator;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Auth\Exception\PermissionDeniedException;
use Discuz\Common\Utils;
use Discuz\Contracts\Setting\SettingsRepository;
use Discuz\Foundation\EventsDispatchTrait;
use Discuz\SpecialChar\SpecialCharServer;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class UpdateAdminUser
{
    use AssertPermissionTrait;

    use EventsDispatchTrait;

    /**
     * @var int
     */
    protected $id;

    /**
     * @var Collection|array
     */
    protected $data;

    /**
     * @var User
     */
    protected $actor;

    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var UserValidator
     */
    protected $validator;

    /**
     * @var SettingsRepository
     */
    protected $settings;

    /**
     * @var Censor
     */
    protected $censor;

    /**
     * @var SpecialCharServer
     */
    protected $specialChar;

    /**
     * @param int $id
     * @param Collection|array $data
     * @param User $actor
     */
    public function __construct($id, $data, User $actor)
    {
        $this->id = $id;
        $this->data = $data;
        $this->actor = $actor;
    }

    /**
     * @param UserRepository $users
     * @param UserValidator $validator
     * @param Dispatcher $events
     * @param SettingsRepository $settings
     * @param Censor $censor
     * @param SpecialCharServer $specialChar
     * @return mixed
     */
    public function handle(UserRepository $users, UserValidator $validator, Dispatcher $events, SettingsRepository $settings, Censor $censor, SpecialCharServer $specialChar)
    {
        $this->users = $users;
        $this->validator = $validator;
        $this->events = $events;
        $this->settings = $settings;
        $this->censor = $censor;
        $this->specialChar = $specialChar;

        return call_user_func([$this, '__invoke']);
    }

    /**
     * @return User
     * @throws CensorNotPassedException
     * @throws GuzzleException
     * @throws InvalidConfigException
     * @throws PermissionDeniedException
     * @throws TranslatorException
     * @throws ValidationException
     */
    public function __invoke()
    {
        $user = $this->users->findOrFail($this->id, $this->actor);

        $canEdit = true;
        $isSelf = $this->actor->id === $user->id;
        if (!empty(Arr::get($this->data, 'data.attributes'))) {
            $attributes = Arr::get($this->data, 'data.attributes');
        } else {
            $attributes = $this->data;
        }
        // ???????????????????????????????????????????????????????????????????????????????????????
        $validate = [];

        // ???????????????
        $this->rename($user, $canEdit, $isSelf, $attributes, $validate);

        // ????????????
        $this->changeNickname($user, $canEdit, $isSelf, $attributes, $validate);

        // ??????????????????
        $this->changePassword($user, $canEdit, $isSelf, $attributes, $validate);

        // ???????????????
        $this->changeMobile($user, $attributes);

        // ??????????????????
        $this->changeStatus($user, $isSelf, $attributes);

        // ?????????????????????
        $this->changeGroups($user, $attributes);

        // ????????????????????????
        $this->changeExpiredAt($user, $attributes);

        // ??????????????????
        $this->changeRegisterReason($user, $attributes, $validate);

        //$this->validator->valid($validate);

        $user->save();

        $this->dispatchEventsFor($user, $this->actor);

        return $user;
    }

    /**
     * @param User $user
     * @param bool $canEdit
     * @param bool $isSelf
     * @param array $attributes
     * @param array $validate
     * @return array
     * @throws CensorNotPassedException
     * @throws GuzzleException
     * @throws InvalidConfigException
     * @throws PermissionDeniedException
     * @throws TranslatorException
     */
    protected function rename(User $user, bool $canEdit, bool $isSelf, array $attributes, array &$validate)
    {
        $username = Arr::get($attributes, 'username');

        if (! $username || $username == $user->username) {
            return $validate;
        }

        $oldUsername = $user->username;

        // ???????????????
        $this->censor->checkText($username, 'username');

        if ($this->censor->isMod) {
            throw new TranslatorException(trans('user.user_username_censor_error'));
        }

        // ????????????
        $username = $this->specialChar->purify($username);

        $isAdmin = true;

        $user->changeUsername($username, $isAdmin);

        if (! $isSelf) {
            AdminActionLog::createAdminActionLog(
                $this->actor->id,
                AdminActionLog::ACTION_OF_USER,
                '?????????????????????'. $oldUsername .'?????????'. $username .'???'
            );
        }

        $validate['username'] = $username;

        return $validate;
    }

    /**
     * @param User $user
     * @param bool $canEdit
     * @param bool $isSelf
     * @param array $attributes
     * @param array $validate
     * @return array
     * @throws PermissionDeniedException
     * @throws TranslatorException
     */
    protected function changePassword(User $user, bool $canEdit, bool $isSelf, array $attributes, array &$validate)
    {
        $newPassword = Arr::get($attributes, 'newPassword');

        if (! $newPassword) {
            return $validate;
        }
        $user->changePassword($newPassword);

        if (! $isSelf) {
            AdminActionLog::createAdminActionLog(
                $this->actor->id,
                AdminActionLog::ACTION_OF_USER,
                '??????????????????'. $user->username .'??????????????????.'
            );
        }

        $validate['password'] = $newPassword;

        return $validate;
    }

    /**
     * @param User $user
     * @param bool $isSelf
     * @param array $attributes
     * @param array $validate
     * @return array
     * @throws TranslatorException
     */
    protected function changePayPassword(User $user, bool $isSelf, array $attributes, array &$validate)
    {
        $payPassword = Arr::get($attributes, 'payPassword');

        if (! $payPassword || ! $isSelf) {
            // ??????????????????????????????
            if (
                Arr::get($attributes, 'removePayPassword')
                && ! empty($user->pay_password)
                && $this->actor->isAdmin()
            ) {
                $user->changePayPassword('');
            } else {
                return $validate;
            }
        }

        // ??????????????????????????????????????????????????????????????????????????? pay_password_token
        // ????????????????????????????????????????????? pay_password_token
        if ($user->pay_password) {
            // ???????????????????????????????????????
            if ($user->checkWalletPayPassword($payPassword)) {
                \Discuz\Common\Utils::outPut(ResponseCode::USER_UPDATE_ERROR);
            }

            $this->validator->setUser($user);

            $validate['pay_password_token'] = Arr::get($attributes, 'pay_password_token');
        }

        $user->changePayPassword($payPassword);

        $validate['pay_password'] = $payPassword;
        $validate['pay_password_confirmation'] = Arr::get($attributes, 'pay_password_confirmation');

        // ????????????????????????
        $user->raise(new PayPasswordChanged($user));

        return $validate;
    }

    /**
     * @param User $user
     * @param array $attributes
     * @throws PermissionDeniedException
     * @throws Exception
     */
    protected function changeMobile(User $user, array $attributes)
    {
        if (! Arr::has($attributes, 'mobile')) {
            return;
        }

        $mobile = Arr::get($attributes, 'mobile');

        // ????????????????????????
        if (! empty($mobile)) {
            if (User::query()->where('mobile', $mobile)->where('id', '<>', $user->id)->exists()) {
                \Discuz\Common\Utils::outPut(ResponseCode::MOBILE_IS_ALREADY_BIND);
            }
        }

        $user->changeMobile($mobile);
    }

    /**
     * @param User $user
     * @param bool $isSelf
     * @param array $attributes
     * @throws PermissionDeniedException
     */
    protected function changeStatus(User $user, bool $isSelf, array $attributes)
    {
        if ($isSelf || ! Arr::has($attributes, 'status') || ($user->status == Arr::get($attributes, 'status'))) {
            return;
        }

        $status = (int) Arr::get($attributes, 'status');

        $user->changeStatus($status);

        // ????????????
        $logMsg = Arr::get($attributes, 'rejectReason', '');

        // ???????????????????????????
        $this->events->dispatch(new ChangeUserStatus($user, $logMsg));
        $this->setRefuseMessage($user, $logMsg);

        // ??????????????????????????????
        UserActionLogs::writeLog($this->actor, $user, User::enumStatus($status), $logMsg);

        $status_desc = [
            '0' => '??????',
            '1' => '??????',
            '2' => '?????????',
            '3' => '????????????',
            '4' => '????????????'
        ];
        AdminActionLog::createAdminActionLog(
            $this->actor->id,
            AdminActionLog::ACTION_OF_USER,
            '??????????????????'. $user->username .'????????????????????????'. $status_desc[$status] .'???'
        );
    }

    //??????????????????
    private function setRefuseMessage(User &$user, $refuseMessage)
    {
        if ($user->status == User::STATUS_REFUSE || $user->status == User::STATUS_BAN) {
            $user->reject_reason = $refuseMessage;
            $user->save();
        }
    }

    /**
     * @param User $user
     * @param array $attributes
     * @throws PermissionDeniedException
     */
    protected function changeGroups(User $user, array $attributes)
    {
        $groups = Arr::get($attributes, 'groupId');

        // ?????? id 1 ????????????????????????????????????????????????
        if ($user->id == 1 || ! $groups) {
            return;
        }

        $groupName = Group::query()->where('id', $groups)->first();

        // ?????????????????? id
        $newGroups = collect($groups)->filter(function ($groupId) {
            return (int) $groupId;
        })->unique()->sort();

        // ??????????????????
        $oldGroups = $user->groups->keyBy('id')->sortKeys();

        // ???????????????????????????????????????????????????????????????
        if ($newGroups && $newGroups->toArray() != $oldGroups->keys()->toArray()) {
            $payGroups = Group::query()->where('is_paid', Group::IS_PAID)->get();
            $payGroupMap = [];
            $payGroups->map(function ($item) use (&$payGroupMap) {
                $payGroupMap[$item->id] = $item;
            });
            $payGroupIds = $payGroups->pluck('id')->toArray();
            $newPayGroupIds = array_intersect($newGroups->toArray(), $payGroupIds);
            $isNewPay = false;
            if (!empty($newPayGroupIds)) {
                $isNewPay = true;
            }
            $oldPayGroupIds = array_intersect($oldGroups->keys()->toArray(), $payGroupIds);
            $isOldPay = false;
            if (!empty($oldPayGroupIds)) {
                $isOldPay = true;
            }

            AdminActionLog::createAdminActionLog(
                $this->actor->id,
                AdminActionLog::ACTION_OF_USER,
                '??????????????????'. $user->username .'????????????????????????'. $groupName['name'] .'???'
            );

            $deleteGroups = array_diff($oldGroups->keys()->toArray(), $newGroups->toArray());
            if ($deleteGroups) {
                if ($isOldPay) {
                    //?????????????????????
                    $deleteGroups = $payGroupIds;
                    $this->deletePayGroups($user, $deleteGroups);
                }
            }

            // ???????????????
            $user->groups()->sync($newGroups);

            //?????????????????????
            foreach ($newPayGroupIds as $paidGroupId) {
                $this->events->dispatch(
                    new PaidGroup($paidGroupId, $user, null, $this->actor)
                );
            }

            // ??????????????????
            $notifyData = [
                'new' => Group::query()->find($newGroups),
                'old' => $oldGroups,
            ];

            // Tag ????????????
            $user->notify(new System(GroupMessage::class, $user, $notifyData));
        }
    }

    protected function deletePayGroups(User $user, array $deleteGroupsIds)
    {
        if (empty($user) || empty($deleteGroupsIds)) {
            return;
        }

        $changeGroupUser = GroupUser::query()->whereIn('group_id', $deleteGroupsIds)->where('user_id', $user->id)->first();
        $dtSeconds = 0;
        if (!empty($changeGroupUser)) {
            $expired_at = $changeGroupUser->expiration_time;
            if (!empty($expired_at)) {
                if ($expired_at>Carbon::now()) {
                    $dtSeconds = Carbon::now()->diffInSeconds(Carbon::parse($expired_at));
                }
            }
        }

        $remainDays = GroupUserMq::query()->whereIn('group_id', $deleteGroupsIds)
            ->where('user_id', $user->id)->sum('remain_days');
        if ($remainDays != 0 || $dtSeconds != 0) {
            if (!empty($user->expired_at)) {
                $user->expired_at = Carbon::parse($user->expired_at)->subDays($remainDays)->subSeconds($dtSeconds);
                $user->save();
            }
        }

        GroupUserMq::query()->whereIn('group_id', $deleteGroupsIds)
            ->where('user_id', $user->id)->delete();
        GroupPaidUser::query()->whereIn('group_id', $deleteGroupsIds)
            ->where('user_id', $user->id)
            ->where('delete_type', 0)
            ->update(['operator_id' => $this->actor->id, 'deleted_at' => Carbon::now(), 'delete_type' => GroupPaidUser::DELETE_TYPE_ADMIN]);
    }

    /**
     * @param User $user
     * @param array $attributes
     * @throws PermissionDeniedException
     */
    protected function changeExpiredAt(User $user, array $attributes)
    {
        $expiredAt = Arr::get($attributes, 'expired_at');
        //????????????????????????????????????return
        if (! $expiredAt || $user->expired_at == Carbon::parse($expiredAt)) {
            return;
        }

        $user->expired_at = Carbon::parse($expiredAt);

        //??????????????????????????????????????????????????????????????????????????????
        $response = User::adjustGroupWithExpiredAt($user, $user->expired_at);
        if ($response['code'] != ResponseCode::SUCCESS) {
            app('log')->error('?????????????????????????????????????????????????????????', $response);
            Utils::outPut($response['code'], $response['msg'], $response['data']);
        }

        //???????????????????????????????????????????????? order ????????? expired_at ??????
        $order = $user->orders()
            ->whereIn('type', [Order::ORDER_TYPE_REGISTER, Order::ORDER_TYPE_RENEW])
            ->where('status', Order::ORDER_STATUS_PAID)
            ->orderBy('id', 'desc')
            ->first();
        if (!empty($order)) {
            $order->expired_at = Carbon::parse($expiredAt);
            $order->save();
        }
    }

    /**
     * @param User $user
     * @param bool $canEdit
     * @param bool $isSelf
     * @param array $attributes
     * @throws CensorNotPassedException
     * @throws GuzzleException
     * @throws InvalidConfigException
     * @throws PermissionDeniedException
     * @throws TranslatorException
     */
    protected function changeSignature(User $user, bool $canEdit, bool $isSelf, array $attributes)
    {
        if (! Arr::has($attributes, 'signature')) {
            return;
        }

        if (! $isSelf) {
            $this->assertPermission($canEdit);
        }

        if ($signature = Arr::get($attributes, 'signature', '')) {
            // ???????????????
            $this->censor->checkText($signature, 'signature');

            // ????????????
            $signature = $this->specialChar->purify($signature);
        }

        if (Str::of($signature)->length() > 140) {
            \Discuz\Common\Utils::outPut(ResponseCode::USER_SINGATURE_LINIT_ERROR);
        }

        $user->changeSignature($signature);
    }

    /**
     * @param User $user
     * @param array $attributes
     * @param array $validate
     * @return array
     */
    protected function changeRegisterReason(User $user, array $attributes, array &$validate)
    {
        if (Arr::has($attributes, 'register_reason') && $user->status == 2) {
            $registerReason = $this->specialChar->purify(Arr::get($attributes, 'register_reason'));

            $user->register_reason = $registerReason;

            $validate['register_reason'] = $registerReason;
        }

        return $validate;
    }

    protected function changeNickname(User $user, bool $canEdit, bool $isSelf, array $attributes, array &$validate)
    {
        $nickname = Arr::get($attributes, 'nickname');

        if (! $nickname || $nickname == $user->nickname) {
            return $validate;
        }

        // ????????????
        $nickname = $this->specialChar->purify($nickname);
        $oldNickname = $user->nickname;
        $user->changeNickname($nickname);
        $validate['nickname'] = $nickname;

        if (! $isSelf) {
            AdminActionLog::createAdminActionLog(
                $this->actor->id,
                AdminActionLog::ACTION_OF_USER,
                '????????????????????????'. $oldNickname .'?????????'. $nickname .'???'
            );
        }

        return $validate;
    }
}
