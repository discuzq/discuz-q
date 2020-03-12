<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateThreads extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->create('threads', function (Blueprint $table) {
            $table->id()->comment('主题 id');
            $table->unsignedBigInteger('user_id')->nullable()->comment('创建用户 id');
            $table->unsignedBigInteger('last_posted_user_id')->nullable()->comment('最后回复用户 id');
            $table->integer('category_id')->unsigned()->nullable()->comment('分类 id');
            $table->tinyInteger('type')->unsigned()->default(0)->comment('文章类型：0普通 1长文 2视频');
            $table->string('title')->default('')->comment('标题');
            $table->decimal('price')->unsigned()->default(0)->comment('价格');
            $table->integer('post_count')->unsigned()->default(0)->comment('回复数');
            $table->integer('view_count')->unsigned()->default(0)->comment('查看数');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('更新时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
            $table->unsignedBigInteger('deleted_user_id')->nullable()->comment('删除用户 id');
            $table->tinyInteger('is_approved')->unsigned()->default(1)->comment('是否合法');
            $table->tinyInteger('is_sticky')->unsigned()->default(0)->comment('是否置顶');
            $table->tinyInteger('is_essence')->unsigned()->default(0)->comment('是否加精');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('last_posted_user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('deleted_user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->dropIfExists('threads');
    }
}
