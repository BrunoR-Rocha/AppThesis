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
        Schema::create('questionnaire_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('questionnaire_id')->constrained('questionnaires');
            $table->text('question');
            $table->integer('order')->nullable();
            $table->boolean('enabled')->default(false);
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
        Schema::dropIfExists('questionnaire_questions');
    }
};
