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

namespace App\Api\Controller\Plugin;

use App\Common\CacheKey;
use App\Common\ResponseCode;
use App\Common\Utils;
use Discuz\Base\DzqAdminController;
use Discuz\Base\DzqCache;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Stream;

class PluginUploadController extends DzqAdminController
{
    public function main()
    {
        /** @var Resource $file */
        $file = Arr::get($this->request->getUploadedFiles(), 'file');
        if (empty($file)){
            $this->outPut(ResponseCode::INVALID_PARAMETER);
        }
        /** @var Stream $fileContent */
        $fileContent = $file->getStream();
        $fileName = $file->getClientFilename();
        $fileSize = $file->getSize();
        if ($fileSize/1024/1024>20){
            $this->outPut(ResponseCode::INVALID_PARAMETER,"包体必须小于20M");
        }
        $ext = pathinfo($fileName,PATHINFO_EXTENSION);
        $fileName = md5($fileName).time().".".$ext;
        if ($ext != "zip"){
            $this->outPut(ResponseCode::INVALID_PARAMETER,"格式错误");
        }
        $fileTemp = $fileContent->getMetadata();
        $dirPath = $fileTemp["uri"];

        /** @var \ZipArchive $zipUn */
        $zipUn = new \ZipArchive();
        if (!$zipUn->open($dirPath)) {
            $this->outPut(ResponseCode::INVALID_PARAMETER,"zip包读取失败");
        }

        $fileConfigHandler = $zipUn->getStream("config.json");
        if (!$fileConfigHandler){
            $zipUn->close();
            $this->outPut(ResponseCode::INVALID_PARAMETER,"配置文件找不到，请按正确目录结构打包");
        }
        $contents="";
        while (!feof($fileConfigHandler)) {
            $contents .= fread($fileConfigHandler, 1024);
        }
        fclose($fileConfigHandler);

        $configJson = json_decode($contents,true);
        $pluginName = $configJson["name_en"];
        if (strpos($pluginName," ")){
            $zipUn->close();
            $this->outPut(ResponseCode::INVALID_PARAMETER,"插件名不能有空格");
        }
        $pluginName = ucfirst($pluginName);

        $basePath = app()->basePath();
        $oldPath = $basePath.DIRECTORY_SEPARATOR."plugin".DIRECTORY_SEPARATOR.$pluginName;
        Utils::removeDir($oldPath);
        $result = $zipUn->extractTo($oldPath);
        $zipUn->close();
        if (!$result){
            $this->outPut(0,'', "解压失败，请检查目录权限等情况");
        }

        $this->outPut(0,'', "上传成功");
    }

    public function suffixClearCache(){
        DzqCache::delKey(CacheKey::PLUGIN_LOCAL_CONFIG);
    }

}