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
        Schema::create('course_interactive_elements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('content_id')->constrained('course_contents')->onDelete('cascade');
            $table->string('type'); // flashcard, drag-and-drop, fill-in-the-blank
            $table->json('data'); // interactive elements information
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
        Schema::dropIfExists('course_interactive_elements');
    }
};
