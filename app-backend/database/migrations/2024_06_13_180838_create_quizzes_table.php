<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('topic_id')->nullable()->constrained('question_topics');
            $table->foreignId('user_id')->constrained('users');
            $table->integer('difficulty')->nullable();
            $table->integer('time_limit')->nullable();
            $table->boolean('is_complete')->default(false)->index();
            $table->timestamp('start_time')->nullable()->index();
            $table->timestamp('end_time')->nullable()->index();
            $table->integer('score')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quizzes');
    }
};
