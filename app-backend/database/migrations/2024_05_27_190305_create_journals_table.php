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
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('publisher');
            $table->string('link')->nullable();
            $table->double('cite_score')->nullable();
            $table->json('subject_area')->nullable();
            $table->json('issn')->nullable();
            $table->string('coverage_start')->nullable();
            $table->string('coverage_end')->nullable();
            $table->json('doi_breakdown_by_year')->nullable();
            $table->boolean('enabled')->default(true);
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
        Schema::dropIfExists('journals');
    }
};
