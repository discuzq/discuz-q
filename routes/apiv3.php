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
use App\Api\Controller as ApiController;

/*
|--------------------------------------------------------------------------
| 注册/登录
|--------------------------------------------------------------------------
*/
//二维码生成
$route->get('/users/pc/wechat/h5.genqrcode', 'pc.wechat.h5.qrcode', ApiController\UsersV3\WechatH5QrCodeController::class);
$route->get('/users/pc/wechat/miniprogram.genqrcode', 'pc.wechat.miniprogram.genqrcode', ApiController\UsersV3\MiniProgramQrcodeController::class);
$route->get('/users/pc/wechat/h5.login', 'pc.wechat.h5.login.poll', ApiController\UsersV3\WechatPcLoginPollController::class);
$route->get('/users/pc/wechat/h5.bind', 'pc.wechat.h5.bind.poll', ApiController\UsersV3\WechatPcBindPollController::class);
$route->get('/users/pc/wechat/miniprogram.bind', 'pc.wechat.miniprogram.bind.poll', ApiController\UsersV3\MiniProgramPcBindPollController::class);
$route->get('/users/pc/wechat/miniprogram.login', 'pc.wechat.miniprogram.login.poll', ApiController\UsersV3\MiniProgramPcLoginPollController::class);
$route->get('/users/mobilebrowser/wechat/miniprogram.genscheme', 'pc.wechat.miniprogram.login.poll', ApiController\UsersV3\MiniProgramSchemeGenController::class);
//登录
$route->post('/users/username.login', 'username.login', ApiController\UsersV3\LoginController::class);
//注册
$route->post('/users/username.register', 'username.register', ApiController\UsersV3\RegisterController::class);
//控制用户名密码入口是否展示
$route->get('/users/username.login.isdisplay', 'username.login.isdisplay', ApiController\UsersV3\LsDisplayController::class);
//用户昵称检测
$route->post('/users/username.check', 'username.check', ApiController\UsersV3\CheckController::class);
//手机号（不区分端）
$route->post('/users/sms.send', 'sms.send', ApiController\UsersV3\SmsSendController::class);
$route->post('/users/sms.verify', 'sms.verify', ApiController\UsersV3\SmsVerifyController::class);
$route->post('/users/sms.login', 'sms.login', ApiController\UsersV3\SmsLoginController::class);
$route->post('/users/sms.bind', 'sms.bind', ApiController\UsersV3\SmsBindController::class);
$route->post('/users/sms.rebind', 'sms.rebind', ApiController\UsersV3\SmsRebindController::class);
$route->post('/users/sms.reset.pwd', 'sms.reset.pwd', ApiController\UsersV3\SmsResetPwdController::class);
$route->post('/users/sms.reset.pay.pwd', 'sms.reset.pay.pwd', ApiController\UsersV3\SmsResetPayPwdController::class);
//H5登录
$route->get('/users/wechat/h5.oauth', 'wechat.h5.oauth', ApiController\UsersV3\WechatH5OauthController::class);
$route->get('/users/wechat/h5.login', 'wechat.h5.login', ApiController\UsersV3\WechatH5LoginController::class);
$route->post('/users/wechat/h5.bind', 'wechat.h5.bind', ApiController\UsersV3\WechatH5BindController::class);
$route->post('/users/wechat/h5.rebind', 'wechat.h5.rebind', ApiController\UsersV3\WechatH5RebindController::class);
//小程序
$route->post('/users/wechat/miniprogram.login', 'wechat.miniprogram.login', ApiController\UsersV3\WechatMiniprogramLoginController::class);
$route->post('/users/wechat/miniprogram.bind', 'wechat.miniprogram.bind', ApiController\UsersV3\WechatMiniprogramBindController::class);
$route->post('/users/wechat/miniprogram.rebind', 'wechat.miniprogram.rebind', ApiController\UsersV3\WechatMiniprogramRebindController::class);
//手机浏览器（微信外）登录并绑定微信
$route->get('/users/mobilebrowser/wechat/h5.bind', 'mobilebrowser.wechat.h5.bind', ApiController\UsersV3\MiniProgramSchemeGenController::class);
$route->post('/users/mobilebrowser/username.login', 'mobilebrowser.username.login', ApiController\UsersV3\MobileBrowserLoginController::class);
$route->get('/users/mobilebrowser/wechat/miniprogram.bind', 'mobilebrowser.wechat.miniprogram.bind', ApiController\UsersV3\MiniProgramSchemeGenController::class);
//登录页设置昵称
$route->post('/users/nickname.set', 'users.nickname.set', ApiController\UsersV3\NicknameSettingController::class);



