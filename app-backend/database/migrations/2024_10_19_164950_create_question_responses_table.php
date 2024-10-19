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
        Schema::create('question_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_quiz_id')->constrained('user_quizzes');
            $table->foreignId('question_id')->constrained('questions');
            $table->boolean('is_correct');
            $table->decimal('response_quality_score', 5, 2)->nullable();
            $table->integer('time_taken')->nullable(); // time taken to answer the question
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
        Schema::dropIfExists('question_responses');
    }
};
