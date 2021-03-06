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

namespace App\Api\Controller\Plugin;

use App\Repositories\UserRepository;
use Discuz\Base\DzqController;

class PluginListController extends DzqController
{
    use PluginTrait;

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        return parent::checkRequestPermissions($userRepo); // TODO: Change the autogenerated stub
    }

    public function main()
    {
        $groupId = $this->user->groupId;
        $isAdmin = $this->user->isAdmin();

        $result = $this->getAllSettingAndConfig($groupId, $isAdmin, false);

        $this->outPut(0, '', array_values($result));
    }
}
