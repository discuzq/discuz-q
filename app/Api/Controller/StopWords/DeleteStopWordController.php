<?php

/**
 *      Discuz & Tencent Cloud
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: DeleteStopWordController.php xxx 2019-09-26 3:55 下午 LiuDongdong $
 */

namespace app\Api\Controller\StopWords;

use App\Models\StopWord;
use Discuz\Api\Controller\AbstractDeleteController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Zend\Diactoros\Response\EmptyResponse;

class DeleteStopWordController extends AbstractDeleteController
{
    /**
     * {@inheritdoc}
     */
    public function delete(ServerRequestInterface $request)
    {
        StopWord::findOrFail(Arr::get($request->getQueryParams(), 'id'))->delete();

        return new EmptyResponse(204);
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     */
    public function data(ServerRequestInterface $request, Document $document)
    {
        // TODO: Implement data() method.
    }
}
