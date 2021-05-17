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

namespace App\Api\Controller\SignInFieldsV3;

use App\Api\Serializer\UserSignInSerializer;
use App\Common\ResponseCode;
use App\Models\UserSignInFields;
use Discuz\Api\Controller\AbstractListController;
use Discuz\Base\DzqController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListUserSignInController extends DzqController
{
    public function main()
    {
        $userId = $this->inPut('userId');
        if(empty($userId)){
            $this->outPut(ResponseCode::USERID_NOT_ALLOW_NULL);
        }

        $result = UserSignInFields::instance()->getUserSignInFields($userId);

        $this->outPut(ResponseCode::SUCCESS, '', $this->camelData($result));
    }
}