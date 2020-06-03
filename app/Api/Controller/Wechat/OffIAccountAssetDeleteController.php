<?php

/**
 * Discuz & Tencent Cloud
 * This is NOT a freeware, use is subject to license terms
 */

namespace App\Api\Controller\Wechat;

use Discuz\Auth\AssertPermissionTrait;
use Discuz\Auth\Exception\PermissionDeniedException;
use Discuz\Contracts\Setting\SettingsRepository;
use Discuz\Http\DiscuzResponseFactory;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException as InvalidConfigExceptionAlias;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use EasyWeChat\Factory;

/**
 * 微信公众号 - 删除单条永久素材
 *
 * @package App\Api\Controller\Wechat
 */
class OffIAccountAssetDeleteController implements RequestHandlerInterface
{
    use AssertPermissionTrait;

    /**
     * @var Factory
     */
    protected $easyWechat;

    /**
     * @var SettingsRepository
     */
    protected $settings;

    /**
     * WechatMiniProgramCodeController constructor.
     *
     * @param Factory $easyWechat
     * @param SettingsRepository $settings
     */
    public function __construct(Factory $easyWechat, SettingsRepository $settings)
    {
        $this->settings = $settings;

        $config = [
            'app_id' => $this->settings->get('offiaccount_app_id', 'wx_offiaccount'),
            'secret' => $this->settings->get('offiaccount_app_secret', 'wx_offiaccount'),
            'response_type' => 'array',
        ];

        $this->easyWechat = $easyWechat::officialAccount($config);
    }

    /**
     * @param ServerRequestInterface $request
     * @return ResponseInterface
     * @throws GuzzleException
     * @throws InvalidConfigExceptionAlias
     * @throws PermissionDeniedException
     * @throws \Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $mediaId = Arr::get($request->getQueryParams(), 'media_id');
        dd($mediaId);
        // 获取永久素材
        $response = $this->easyWechat->material->delete($mediaId);

        /**
         * 根据类型数据不同 返回数据形式&格式不同
         */
        switch ($type) {
            case 'image': // 图片（image）
                header('Content-type: image/jpeg');
                return $response;
            case 'video': // 视频（video）
                return DiscuzResponseFactory::JsonApiResponse($response);
            case 'voice': // 语音（voice）
                header('Content-type: audio/mpeg');
                return $response;
            case 'news':  // 图文（news）
                return DiscuzResponseFactory::JsonResponse($response);
            default:
                throw new \Exception('Unexpected value');
        }
    }
}
