<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn(['title', 'body', 'section']);
        });
    }
    
    public function down()
    {
        Schema::table('faqs', function (Blueprint $table) {
            $table->string('title')->nullable();
            $table->text('body')->nullable();
            $table->string('section')->nullable();
        });
    }
};
