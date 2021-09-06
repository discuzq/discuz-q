<?php
/**
 *@OA\Get(
 *    path = "/apiv3/topics.list",
 *    summary = "发布与展示",
 *    description = "Discuz! Q 表情列表",
 *    tags ={"发布与展示"},
 *@OA\Parameter(ref = "#/components/parameters/bear_token"),
 *@OA\Parameter(ref = "#/components/parameters/page"),
 *@OA\Parameter(ref = "#/components/parameters/perPage"),
 *@OA\Parameter(
 *     name="filter[recommended]",
 *     in="query",
 *     required=true,
 *     description="是否为推荐话题；1：推荐、0：不推荐",
 *     @OA\Schema(
 *      type="integer", default=1
 * )
 * ),
 *
 * @OA\Response(
 *        response = 200,
 *        description = "返回话题列表",
 *        @OA\JsonContent(allOf ={
 *                 @OA\Schema(ref = "#/components/schemas/dzq_layout"),
 *                 @OA\Schema(@OA\Property(property = "Data", type = "object",allOf={
 *                    @OA\Schema(ref = "#/components/schemas/dzq_pagination"),
 *                    @OA\Schema(ref = "#/components/schemas/dzq_topic_list")
 *                }))
 *            }
 *        )
 *    )
 *)
 *
 * @OA\Schema(
 *     schema="dzq_topic_list",
 *     title="话题列表",
 *     @OA\Property(property = "pageData", type = "array", @OA\Items(type="object", ref="#/components/schemas/dzq_topic_item"))
 * )
 *
 *
 * @OA\Schema(
 *     schema = "dzq_topic_item",
 *     title = "话题详情",
 *     @OA\Property(property = "topicId", type = "integer", description = "话题id"),
 *     @OA\Property(property = "userId", type = "integer", description = "话题创建人id"),
 *     @OA\Property(property = "username", type = "string", description = "话题创建人名称"),
 *     @OA\Property(property = "viewCount", type = "integer", description = "话题查看数量"),
 *     @OA\Property(property = "threadCount", type = "integer", description = "话题引用帖子数量"),
 *     @OA\Property(property = "recommended", type = "integer", description = "是否推荐；true：推荐、false：不推荐"),
 *     @OA\Property(property = "content", type = "string", description = "话题内容"),
 *     @OA\Property(property = "recommendAt", type = "string", format="datetime", description = "推荐时间"),
 * )
 */

