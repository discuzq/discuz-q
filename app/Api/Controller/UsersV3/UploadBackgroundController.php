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

use App\Commands\Users\UploadBackground;
use App\Common\ResponseCode;
use Discuz\Base\DzqController;
use Discuz\Contracts\Setting\SettingsRepository;
use Illuminate\Contracts\Bus\Dispatcher;

class UploadBackgroundController extends DzqController
{
    /**
     * @var Dispatcher
     */
    protected $bus;

    protected $filesystem;

    protected $settings;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus,SettingsRepository $settings)
    {
        $this->bus = $bus;
        $this->settings = $settings;
    }

    public function main()
    {
        $uploadFile = $this->request->getUploadedFiles();
        if(empty($uploadFile)){
            $this->outPut(ResponseCode::INVALID_PARAMETER,'');
        }
        $file = $uploadFile['background'];
        $actor = $this->user;
        $id = $actor->id;
        $result = $this->bus->dispatch(
            new UploadBackground($id, $file, $actor)
        );
        $url = $this->request->getUri();
        $port = $url->getPort();
        $port = $port == null ? '' : ':' . $port;
        $path = $url->getScheme() . '://' . $url->getHost() . $port;
        $backUrl = $path."/storage/background/".$result->background;
        if (strpos($result->background,"cos://") !== false) {
           $background = str_replace("cos://","",$result->background);
           $remoteServer = $this->settings->get('qcloud_cos_cdn_url', 'qcloud', true);
           $right =  substr($remoteServer, -1);
           if("/"==$right){
               $remoteServer = substr($remoteServer,0,strlen($remoteServer)-1);
           }
           $backUrl = $remoteServer."/public/background/".$background;
        }
        $result = [
            'id' => $result->id,
            'username' => $result->username,
            'backgroundUrl' => $backUrl,
            'updatedAt' => optional($result->updated_at)->format('Y-m-d H:i:s'),
            'createdAt' => optional($result->created_at)->format('Y-m-d H:i:s'),
        ];
        return $this->outPut(ResponseCode::SUCCESS,'', $result);
    }

}