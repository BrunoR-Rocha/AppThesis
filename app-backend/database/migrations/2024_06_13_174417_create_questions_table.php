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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->text('title');

            $table->foreignId('type_id')->constrained('question_types');
            $table->foreignId('user_id')->constrained('users');

            $table->text('explanation')->nullable();
            $table->text('hint')->nullable();

            $table->integer('difficulty')->nullable();
            $table->string('status')->nullable(); //active, inactive, in-review
            $table->string('image_path')->nullable();

            // add relevant keywords for better organization and searchability
            $table->json('tags')->nullable(); 

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
        Schema::dropIfExists('questions');
    }
};
