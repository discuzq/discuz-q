<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAttachments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->create('attachments', function (Blueprint $table) {
            $table->increments('id')->comment('附件 ID');
            $table->uuid('uuid')->comment('uuid');
            $table->unsignedInteger('user_id')->comment('用户 ID');
            $table->unsignedInteger('post_id')->default(0)->comment('帖子 ID');
            $table->tinyInteger('is_gallery')->unsigned()->default(0)->comment('是否是帖子图片');
            $table->tinyInteger('is_approved')->unsigned()->default(1)->comment('是否合法');
            $table->string('attachment')->default('')->comment('文件系统生成的名称');
            $table->string('file_path')->default('')->comment('文件路径');
            $table->string('file_name')->default('')->comment('文件原名称');
            $table->unsignedInteger('file_size')->default(0)->comment('文件大小');
            $table->char('file_type', 15)->default('')->comment('文件类型');
            $table->unsignedTinyInteger('is_remote')->default(0)->comment('是否远程附件');
            $table->ipAddress('ip')->default('')->comment('ip 地址');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->dropIfExists('attachments');
    }
}
