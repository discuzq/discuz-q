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

namespace App\Api\Exceptions;

use App\Common\ResponseCode;
use Discuz\Common\Utils;
use Exception;
use App\Exceptions\TranslatorException;
use Illuminate\Http\Request;
use Tobscure\JsonApi\Exception\Handler\ExceptionHandlerInterface;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;

class TranslatorExceptionHandler implements ExceptionHandlerInterface
{
    /**
     * If the exception handler is able to format a response for the provided exception,
     * then the implementation should return true.
     *
     * @param \Exception $e
     *
     * @return bool
     */
    public function manages(Exception $e)
    {
        return $e instanceof TranslatorException;
    }

    /**
     * @param Exception $e
     * @return ResponseBag
     */
    public function handle(Exception $e)
    {
        $path = Request::capture()->getPathInfo();
        if (strstr($path, 'v2')||strstr($path, 'v3')) {
            Utils::outPut(ResponseCode::INVALID_PARAMETER, $e->getMessage());
            return null;
        }
        $errors = [
            [
                'status' => $e->getCode(),
                'code' => $e->getMessage() ?: 'unknown_error',
            ]
        ];

        /** @var TranslatorException $e */
        if (!empty($e->getDetail())) {
            $errors = array_merge($errors[0], ['detail' => $e->getDetail()]);
        }

        return new ResponseBag($e->getCode(), [$errors]);
    }
}
