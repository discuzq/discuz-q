<?php
/**
 *@OA\Post(
 *    path = "/apiv3/order.create",
 *    summary = "创建订单",
 *    description = "Discuz! Q 创建订单",
 *    tags ={"支付钱包"},
 *    @OA\Parameter(ref = "#/components/parameters/bear_token"),
 *     @OA\RequestBody(
 *        required=true,
 *        description = "创建订单",
 *        @OA\JsonContent(
 *           @OA\Property(property="amount",type="number",description="订单金额"),
 *           @OA\Property(property="isAnonymous",type="boolean",description="是否匿名"),
 *           @OA\Property(property="title",type="string",description="订单名称"),
 *           @OA\Property(property="redAmount", type="number",description="红包金额"),
 *           @OA\Property(property="rewardAmount", type="number",description="悬赏金额"),
 *           @OA\Property(property="threadId", type="integer",description="帖子id"),
 *           @OA\Property(property="groupId", type="integer",description="用户组id"),
 *           @OA\Property(property="payeeId", type="integer",description="收款人id"),
 *           @OA\Property(property="type", type="integer",description="交易类型；
 * 1：注册、2：打赏、3：付费主题、4：付费用户组、5：问答提问、6：问答围观、7：付费附件、8：站点续费、9：红包、10：悬赏、11：合并支付、20：文字贴红包、21：长文贴红包"),
 *        )
 *     ),
 *
 * @OA\Response(
 *        response = 200,
 *        description = "",
 *        @OA\JsonContent(allOf ={
 *                @OA\Schema(ref = "#/components/schemas/dzq_layout"),
 *                @OA\Schema(@OA\Property(property="Data",type="object", ref="#/components/schemas/dzq_order"))
 *            }
 *        )
 *    )
 *)
 *
 * @OA\Schema(
 *     schema="dzq_order",
 *     @OA\Property(property="orderSn", type="string", description="订单编号"),
 *     @OA\Property(property="paymentSn", type="string", description="支付订单编号"),
 *     @OA\Property(property="status", type="integer", description="订单状态；0：待付款、1：已付款、4：订单已过期"),
 *
 * )
 *
 *
 *
 */
