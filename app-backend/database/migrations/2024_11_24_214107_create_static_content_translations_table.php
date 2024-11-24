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
        Schema::create('static_content_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('static_content_id')->constrained('static_contents')->onDelete('cascade');
            $table->string('locale');
            $table->string('title')->nullable();
            $table->longText('content')->nullable();
            $table->timestamps();

            $table->unique(['static_content_id', 'locale']);
            $table->index('locale');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('static_content_translations');
    }
};
