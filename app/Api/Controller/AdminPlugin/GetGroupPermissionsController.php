<?php
/**
 * Copyright (C) 2021 Tencent Cloud.
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

namespace App\Api\Controller\AdminPlugin;


use App\Common\PermissionKey;
use App\Models\PluginGroupPermission;
use Discuz\Base\DzqAdminController;

class GetGroupPermissionsController extends DzqAdminController
{
    public function main()
    {
        $groupId = $this->inPut('groupId');
        $this->dzqValidate(['groupId' => $groupId], ['groupId' => 'required|integer']);
        $pluginList = \Discuz\Common\Utils::getPluginList();
        $permissions = PluginGroupPermission::query()
            ->where('group_id', $groupId)->get()->keyBy('app_id')->toArray();
        $ret = [];
        foreach ($pluginList as $appId => $appConfig) {
            $permission = $permissions[$appId] ?? null;
            $ret[] = [
                'appId' => $appId,
                'authority' => [
                    'title' => '插入' . $appConfig['name_cn'],
                    'permission' => PermissionKey::PLUGIN_INSERT_PERMISSION,
                    'canInsert' => empty($permission) ? false : ($permission['status'] ? true : false),
                ],
                'name' => $appConfig['name_cn'],
                'description' => $appConfig['description']
            ];
        }
        $this->outPut(0, '', $ret);
    }
}
