<?php
/**
 * @OA\Schema(
 *     schema="activity",
 *     title="活动报名插件入参和出参",
 *     @OA\Property(property = "输入", type = "object", description = "活动报名插件入参",
 *         @OA\Property(property = "title", type = "string", description = "活动名称,50个字符"),
 *         @OA\Property(property = "content", type = "string", description = "活动内容,200个字符"),
 *         @OA\Property(property = "activityStartTime", type = "string", description = "活动开始时间"),
 *         @OA\Property(property = "activityEndTime", type = "string", description = "活动结束时间"),
 *         @OA\Property(property = "registerStartTime", type = "string", description = "报名开始时间"),
 *         @OA\Property(property = "registerEndTime", type = "string", description = "报名结束时间"),
 *         @OA\Property(property = "totalNumber", type = "integer", description = "报名人数上限 0:不限制"),
 *         @OA\Property(property = "position", type = "object", description = "位置信息",
 *             @OA\Property(property = "address", type = "string", description = "地址信息"),
 *             @OA\Property(property = "location", type = "string", description = "位置信息"),
 *             @OA\Property(property = "longitude", type = "string", description = "经度"),
 *             @OA\Property(property = "latitude", type = "string", description = "纬度")
 *         )
 *     ),
 *     @OA\Property(property = "输出", type = "object", description = "活动报名插件出参",
 *         @OA\Property(property = "activityId", type = "integer", description = "活动id"),
 *         @OA\Property(property = "title", type = "string", description = "活动名称,50个字符"),
 *         @OA\Property(property = "content", type = "string", description = "活动内容,200个字符"),
 *         @OA\Property(property = "activityStartTime", type = "string", description = "活动开始时间"),
 *         @OA\Property(property = "activityEndTime", type = "string", description = "活动结束时间"),
 *         @OA\Property(property = "registerStartTime", type = "string", description = "报名开始时间"),
 *         @OA\Property(property = "registerEndTime", type = "string", description = "报名结束时间"),
 *         @OA\Property(property = "totalNumber", type = "integer", description = "报名人数上限 0:不限制"),
 *         @OA\Property(property = "currentNumber", type = "integer", description = "当前已报名人数"),
 *         @OA\Property(property = "isRegist", type = "boolean", description = "已经报名登记"),
 *         @OA\Property(property = "isExpired", type = "boolean", description = "活动已过期"),
 *         @OA\Property(property = "isFull", type = "boolean", description = "人数已满"),
 *         @OA\Property(property = "position", type = "object", description = "位置信息",
 *            @OA\Property(property = "address", type = "string", description = "地址信息"),
 *            @OA\Property(property = "location", type = "string", description = "位置信息"),
 *            @OA\Property(property = "longitude", type = "string", description = "经度"),
 *            @OA\Property(property = "latitude", type = "string", description = "纬度")
 *         ),
 *         @OA\Property(property = "createAt", type = "string", description = "活动发起时间"),
 *         @OA\Property(property = "updateAt", type = "string", description = "活动最近编辑时间"),
 *     )
 * )
 */
