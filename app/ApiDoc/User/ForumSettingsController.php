<?php
/**
 * @OA\Get(
 *     path="/apiv3/forum",
 *     summary="全局配置信息",
 *     description="全局配置信息",
 *     tags={"发布与展示"},
 *     @OA\Parameter(ref="#/components/parameters/bear_token"),
 *     @OA\Response(response=200,description="返回站点配置详情",@OA\JsonContent(allOf={
 *         @OA\Schema(ref="#/components/schemas/dzq_layout"),
 *         @OA\Schema(@OA\Property(property="Data",type="object",
 *             @OA\Property(property="setSite",type="object",description="网站设置",
 *                 @OA\Property(property="siteName",type="string",description="网站名称"),
 *                 @OA\Property(property="siteTitle",type="string",description="网站标题"),
 *                 @OA\Property(property="siteKeywords",type="string",description="网站关键词"),
 *                 @OA\Property(property="siteIntroduction",type="string",description="网站介绍"),
 *                 @OA\Property(property="siteMode",type="string",enum={"private","public"}, description="公开模式"),
 *                 @OA\Property(property="openExtFields",type="integer",description="开启扩展字段注册"),
 *                 @OA\Property(property="siteClose",type="boolean",description="关闭站点"),
 *                 @OA\Property(property="siteManage",type="object",description="网站各端开启或关闭"),
 *                 @OA\Property(property="apiFreq",type="object",description="接口限频"),
 *                 @OA\Property(property="siteCloseMsg",type="string",description="网站关闭提示语"),
 *                 @OA\Property(property="siteFavicon",type="string",description="网站默认浏览器标签栏图标"),
 *                 @OA\Property(property="siteLogo",type="string",description="网站logo"),
 *                 @OA\Property(property="siteHeaderLogo",type="string",description="首页头图"),
 *                 @OA\Property(property="siteBackgroundImage",type="string",description="背景图设置"),
 *                 @OA\Property(property="siteUrl",type="string",description="网站域名地址"),
 *                 @OA\Property(property="siteStat",type="string",description=""),
 *                 @OA\Property(property="siteAuthor",type="object",description="网站默认管理员"),
 *                 @OA\Property(property="siteInstall",type="string",description="网站安装时间"),
 *                 @OA\Property(property="siteRecord",type="string",description="网站备案信息"),
 *                 @OA\Property(property="siteCover",type="string",description=""),
 *                 @OA\Property(property="siteRecordCode",type="string",description="网站备案号"),
 *                 @OA\Property(property="siteMasterScale",type="string",description=""),
 *                 @OA\Property(property="sitePayGroupClose",type="string",description=""),
 *                 @OA\Property(property="siteMinimumAmount",type="string",description=""),
 *                 @OA\Property(property="siteOpenSort",type="string",description=""),
 *                 @OA\Property(property="usernameLoginIsdisplay",type="boolean",description="显示登录用户名"),
 *                 @OA\Property(property="openApiLog",type="boolean",description="打开api日志"),
 *                 @OA\Property(property="openViewCount",type="boolean",description="打开默认阅读计数规则"),
 *             ),
 *             @OA\Property(property="setReg",type="object",description="注册设置",
 *                 @OA\Property(property="registerClose",type="boolean",description="开启注册"),
 *                 @OA\Property(property="registerValidate",type="boolean",description="注册验证"),
 *                 @OA\Property(property="registerCaptcha",type="string",description="开启验证码"),
 *                 @OA\Property(property="passwordLength",type="string",description="密码长度"),
 *                 @OA\Property(property="passwordStrength",type="array",description="密码强度规则",@OA\Items(@OA\Schema(type="integer"))),
 *                 @OA\Property(property="registerType",type="integer",enum={0,1,2}, description="0:用户名 1:手机号 2:微信无感模式"),
 *                 @OA\Property(property="isNeedTransition",type="string",description="")
 *             ),
 *             @OA\Property(property="passport",type="object",description="账号密钥",
 *                 @OA\Property(property="offiaccountOpen",type="boolean",description="开启公众号注册"),
 *                 @OA\Property(property="miniprogramOpen",type="boolean",description="开启小程序注册"),
 *             ),
 *             @OA\Property(property="paycenter",type="object",description="支付设置",
 *                 @OA\Property(property="wxpayClose",type="boolean",description="开启微信支付"),
 *                 @OA\Property(property="wxpayIos",type="boolean",description="开启ios微信支付"),
 *                 @OA\Property(property="wxpayMchpayClose",type="boolean",description="开启企业打款到零钱"),
 *             ),
 *             @OA\Property(property="setAttach",type="object",description="附件设置",
 *                 @OA\Property(property="supportImgExt",type="string",description="支持的图片后缀名称"),
 *                 @OA\Property(property="supportFileExt",type="string",description="支持的文件后缀名称"),
 *                 @OA\Property(property="supportMaxSize",type="integer",description="支持最大文件,单位MB"),
 *                 @OA\Property(property="supportMaxDownloadNum",type="integer",description="单个用户一天下载的最多次数"),
 *             ),
 *             @OA\Property(property="qcloud",type="object",description="腾讯云设置",
 *                 @OA\Property(property="qcloudAppId",type="string",description="腾讯云appid"),
 *                 @OA\Property(property="qcloudClose",type="boolean",description="开启腾讯云服务"),
 *                 @OA\Property(property="qcloudCos",type="boolean",description="开启cos对象存储"),
 *                 @OA\Property(property="qcloudCaptcha",type="boolean",description="开启验证码"),
 *                 @OA\Property(property="qcloudCaptchaAppId",type="string",description="验证码应用id"),
 *                 @OA\Property(property="qcloudFaceid",type="boolean",description=""),
 *                 @OA\Property(property="qcloudSms",type="boolean",description="短信"),
 *                 @OA\Property(property="qcloudVod",type="boolean",description="云点播"),
 *                 @OA\Property(property="qcloudCosDocPreview",type="boolean",description="cos文件预览"),
 *                 @OA\Property(property="qcloudCosBucketName",type="string",description="存储桶名称"),
 *                 @OA\Property(property="qcloudCosBucketArea",type="string",description="存储桶地区"),
 *                 @OA\Property(property="qcloudCosSignUrl",type="boolean",description="存储桶签名"),
 *                 @OA\Property(property="qcloudVodAutoPlay",type="boolean",description="云点播视频自动播放"),
 *                 @OA\Property(property="qcloudVodExt",type="string",description="视频后缀名"),
 *                 @OA\Property(property="qcloudVodSize",type="string",description="视频文件大小"),
 *                 @OA\Property(property="qcloudVodSubAppId",type="string",description="云点播应用id"),
 *                 @OA\Property(property="qcloudVodWatermark",type="string",description="云点播水印"),
 *                 @OA\Property(property="qcloudVodToken",type="string",description="云点播回调验证码")
 *             ),
 *             @OA\Property(property="setCash",type="object",description="网站分成",
 *                 @OA\Property(property="cashRate",type="number",description="提现费率0~1"),
 *                 @OA\Property(property="cashMinSum",type="number",description="最小提现金额"),
 *             ),
 *             @OA\Property(property="other",type="object",description="其他设置信息",
 *                 @OA\Property(property="countThreads",type="number",description="主题总数"),
 *                 @OA\Property(property="countPosts",type="number",description="评论总数"),
 *                 @OA\Property(property="countUsers",type="number",description="用户总数"),
 *                 @OA\Property(property="canEditUserGroup",type="boolean",description=""),
 *                 @OA\Property(property="canEditUserStatus",type="boolean",description=""),
 *                 @OA\Property(property="canCreateThreadInCategory",type="boolean",description=""),
 *                 @OA\Property(property="canViewThreads",type="boolean",description=""),
 *                 @OA\Property(property="canFreeViewPaidThreads",type="boolean",description=""),
 *                 @OA\Property(property="canCreateDialog",type="boolean",description=""),
 *                 @OA\Property(property="canInviteUserScale",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadAttachment",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadPaid",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadVideo",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadImage",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadAudio",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadGoods",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadPosition",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadRedPacket",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadReward",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadAnonymous",type="boolean",description=""),
 *                 @OA\Property(property="canInsertThreadVote",type="boolean",description=""),
 *                 @OA\Property(property="initializedPayPassword",type="boolean",description=""),
 *                 @OA\Property(property="createThreadWithCaptcha",type="boolean",description=""),
 *                 @OA\Property(property="publishNeedBindPhone",type="boolean",description=""),
 *                 @OA\Property(property="publishNeedBindWechat",type="boolean",description=""),
 *                 @OA\Property(property="disabledChat",type="boolean",description=""),
 *             ),
 *             @OA\Property(property="lbs",type="object",description="lbs定位",
 *                 @OA\Property(property="lbs",type="boolean",description="开启lbs定位服务"),
 *                 @OA\Property(property="qqLbsKey",type="string",description="qqlbs key[免费版]"),
 *             ),
 *             @OA\Property(property="ucenter",type="object",description="废弃字段"),
 *             @OA\Property(property="agreement",type="object",description="网站协议",
 *                 @OA\Property(property="privacy",type="boolean",description="开启隐私协议"),
 *                 @OA\Property(property="privacyContent",type="string",description="隐私协议内容"),
 *                 @OA\Property(property="register",type="boolean",description="注册协议"),
 *                 @OA\Property(property="registerContent",type="string",description="注册协议内容")
 *             ),
 *         ))
 *     }))
 *
 * )
 */