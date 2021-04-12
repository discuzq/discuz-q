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

namespace App\Modules\ThreadTom\Busi;

use App\Common\ResponseCode;
use App\Modules\ThreadTom\TomBaseBusi;
use App\Models\ThreadVideo;
use App\Models\ThreadTom;

class VideoBusi extends TomBaseBusi
{

    public function create()
    {
        $input = $this->verification();

        $threadVideo = ThreadVideo::query()
            ->whereIn('id',$input['videoIds'])
            ->where('type',ThreadVideo::TYPE_OF_VIDEO)
            ->get()
            ->toArray();

        if(empty($threadVideo)){
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, ResponseCode::$codeMap[ResponseCode::RESOURCE_NOT_FOUND]);
        }
        return $this->jsonReturn($threadVideo);
    }

    public function update()
    {
        return $this->create();
    }

    public function delete()
    {
        $deleteId = $this->getParams('deleteId');

        $threadTom = ThreadTom::query()
            ->where('id',$deleteId)
            ->update(['status'=>-1]);

        if ($threadTom) {
            return true;
        }

        return false;
    }

    public function verification()
    {
        $input = [
            'videoIds' => $this->getParams('videoIds'),
        ];
        $rules = [
            'videoIds' => 'required|array',
        ];
        $this->dzqValidate($input, $rules);

        return $input;
    }
}
