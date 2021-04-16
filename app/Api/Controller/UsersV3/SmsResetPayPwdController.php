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

namespace App\Api\Controller\UsersV3;

use App\Common\ResponseCode;
use App\Models\UserWalletFailLogs;
use App\Validators\UserValidator;

class SmsResetPayPwdController extends AuthBaseController
{
    protected $validator;

    public function __construct(UserValidator $validator) {
        $this->validator = $validator;
    }

    public function main()
    {
        $mobile                     = $this->inPut('mobile');
        $code                       = $this->inPut('code');
        $pay_password               = $this->inPut('payPassword');
        $pay_password_confirmation  = $this->inPut('payPasswordConfirmation');

        $data = array();
        $data['mobile']                         = $mobile;
        $data['code']                           = $code;
        $data['payPassword']                   = $pay_password;
        $data['payPasswordConfirmation']      = $pay_password_confirmation;

        $this->dzqValidate($data, [
            'mobile'                        => 'required',
            'code'                          => 'required',
            'payPassword'                   => 'required',
            'payPasswordConfirmation'       => 'required',
        ]);

        $mobileCode = $this->changeMobileCodeState($mobile, 'reset_pay_pwd', $code);

        if ($mobileCode->user && isset($pay_password)) {
            $this->validator->valid([
                                        'payPassword' => $pay_password,
                                        'payPasswordConfirmation' => $pay_password_confirmation,
                                    ]);

            // 验证新密码与原密码不能相同
            if ($mobileCode->user->checkWalletPayPassword($pay_password)) {
                $this->outPut(ResponseCode::USER_UPDATE_ERROR,
                              ResponseCode::$codeMap[ResponseCode::USER_UPDATE_ERROR]
                );
            }

            $mobileCode->user->changePayPassword($pay_password);
            $mobileCode->user->save();

            // 清空支付密码错误次数
            UserWalletFailLogs::deleteAll($mobileCode->user->id);

            $this->outPut(ResponseCode::SUCCESS, '', $mobileCode->user);
        }

        $this->outPut(ResponseCode::NET_ERROR,ResponseCode::$codeMap[ResponseCode::NET_ERROR]);
    }
}
