<?php
/**
 * @OA\Get(
 *     path="/apiv3/view.count",
 *     summary="获得主题的查看次数",
 *     description="主获得主题的查看次数",
 *     tags={"发布与展示"},
 *     @OA\Parameter(ref="#/components/parameters/bear_token"),
 *     @OA\Parameter(name="threadId",
 *          in="query",
 *          required=true,
 *          description = "主题id",
 *          @OA\Schema(type="integer")),
 *     @OA\Response(
 *          response=200,
 *          description="返回更新结果",
 *          @OA\JsonContent(
 *              allOf={
 *                  @OA\Schema(ref="#/components/schemas/dzq_layout"),
 *                  @OA\Schema(@OA\Property(property="Data",type="object",
 *                      @OA\Property(property="viewCount",type="integer",description = "查看次数")
 *                  ))
 *          }))
 * )
 */
