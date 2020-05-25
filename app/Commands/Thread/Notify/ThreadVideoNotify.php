<?php


/**
 * Discuz & Tencent Cloud
 * This is NOT a freeware, use is subject to license terms
 */

namespace App\Commands\Thread\Notify;

use App\Censor\Censor;
use App\Models\ThreadVideo;
use App\Repositories\PostRepository;
use App\Repositories\ThreadRepository;
use App\Repositories\ThreadVideoRepository;
use Discuz\Qcloud\QcloudTrait;
use Illuminate\Contracts\Events\Dispatcher;
use Discuz\Foundation\EventsDispatchTrait;
use Illuminate\Support\Arr;

class ThreadVideoNotify
{
    use EventsDispatchTrait;
    use QcloudTrait;

    protected $data;

    /**
     *
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     *
     * @param Dispatcher $events
     * @param ThreadVideoRepository $threadVideos
     * @param Censor $censor
     * @param PostRepository $posts
     * @param ThreadRepository $threads
     * @return string
     */
    public function handle(Dispatcher $events, ThreadVideoRepository $threadVideos, Censor $censor, PostRepository $posts, ThreadRepository $threads)
    {
        $this->events = $events;
        $log = app('qcloudLog');
        try {
            $log->info('vod_notify', $this->data);
        } catch (\Exception $e) {
            goto todo;
        }

        todo:
        //只处理视频处理类型的通知
        if (Arr::get($this->data, 'EventType') != 'ProcedureStateChanged') {
            return 'pass';
        }
        $taskDetail  = $this->describeTaskDetail(Arr::get($this->data, 'ProcedureStateChangeEvent.TaskId'));
        if ($taskDetail && $taskDetail->TaskType == 'Procedure' && $taskDetail->Status == 'FINISH') {
            if ($taskDetail->ProcedureTask->Status == 'FINISH') {

                /** @var ThreadVideo $threadVideo */
                $threadVideo = $threadVideos->findOrFailByFileId($taskDetail->ProcedureTask->FileId);

                foreach ($taskDetail->ProcedureTask->MediaProcessResultSet as $key => $value) {
                    //普通转码
                    if ($value->Type == 'Transcode') {
                        if ($value->TranscodeTask->ErrCode == 0) {
                            //转码成功
                            $threadVideo->status = ThreadVideo::VIDEO_STATUS_SUCCESS;
                            $threadVideo->media_url = $value->TranscodeTask->Output->Url;
                            $threadVideo->width = $value->TranscodeTask->Output->Width;
                            $threadVideo->height = $value->TranscodeTask->Output->Height;
                        } else {
                            //转码失败
                            $threadVideo->status = ThreadVideo::VIDEO_STATUS_FAIL;
                            $threadVideo->reason = $value->TranscodeTask->Message;
                        }
                    }

                    //自适应码流转码
                    if ($value->Type == 'AdaptiveDynamicStreaming') {
                        if ($value->AdaptiveDynamicStreamingTask->ErrCode == 0) {
                            //转码成功
                            $threadVideo->status = ThreadVideo::VIDEO_STATUS_SUCCESS;
                            $threadVideo->media_url = $value->AdaptiveDynamicStreamingTask->Output->Url;
                        } else {
                            //转码失败
                            $threadVideo->status = ThreadVideo::VIDEO_STATUS_FAIL;
                            $threadVideo->reason = $value->AdaptiveDynamicStreamingTask->Message;
                        }
                    }

                    if ($value->Type == 'CoverBySnapshot') {
                        if ($value->CoverBySnapshotTask->ErrCode == 0) {
                            //截取封面图成功
                            $threadVideo->cover_url = $value->CoverBySnapshotTask->Output->CoverUrl;
                        }
                    }
                    //动图任务流
                    if ($value->Type == 'AnimatedGraphics') {
                        if ($value->AnimatedGraphicTask->ErrCode == 0) {
                            //截取封面图成功
                            $threadVideo->cover_url = $value->AnimatedGraphicTask->Output->Url;
                        }
                    }
                }
            }

            $threadVideo->save();

            //主题审核状态
            $post = $posts->query()->where('thread_id', $threadVideo->thread_id)->firstOrFail();
            $censor->checkText($post->content);
            if (!$censor->isMod && $threadVideo->status == ThreadVideo::VIDEO_STATUS_SUCCESS) {
                $thread = $threads->findOrFail($threadVideo->thread_id);
                $thread->is_approved = 1;
                $thread->save();
            }
        }

        return 'success';
    }
}
