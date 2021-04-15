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

class SmsBindController extends AuthBaseController
{
    public function main()
    {
        $mobile = $this->inPut('mobile');
        $code   = $this->inPut('code');

        $data = array();
        $data['mobile'] = $mobile;
        $data['code']   = $code;

        $this->dzqValidate($data, [
            'mobile'    => 'required',
            'code'      => 'required'
        ]);

        $mobileCode = $this->changeMobileCodeState($mobile, 'bind', $code);

        // 判断手机号是否已经被绑定
        if ($mobileCode->user->mobile) {
            $this->outPut(ResponseCode::MOBILE_IS_ALREADY_BIND,
                          ResponseCode::$codeMap[ResponseCode::MOBILE_IS_ALREADY_BIND]
            );
        }

        if ($this->user->exists) {
            $this->user->changeMobile($mobileCode->mobile);
            $this->user->save();

            $this->outPut(ResponseCode::SUCCESS, '', []);
        }

        $this->outPut(ResponseCode::NET_ERROR,ResponseCode::$codeMap[ResponseCode::NET_ERROR]);
    }
}