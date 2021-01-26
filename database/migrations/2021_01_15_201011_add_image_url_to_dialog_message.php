<?php

use Discuz\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddImageUrlToDialogMessage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema()->table('dialog_message', function (Blueprint $table) {
            $table->text('image_url')->after('message_text')->comment('图片路径');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema()->table('dialog_message', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });
    }
}
