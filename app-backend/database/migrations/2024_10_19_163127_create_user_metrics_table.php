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
        Schema::create('user_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('overall_score', 5, 2)->nullable();
            $table->decimal('accuracy_rate', 5, 2)->nullable();
            $table->decimal('time_efficiency', 8, 2)->nullable();
            $table->decimal('improvement_rate', 5, 2)->nullable();
            $table->decimal('score_standard_deviation', 5, 2)->nullable();
            $table->decimal('learning_curve_efficiency', 5, 2)->nullable();
            $table->decimal('completion_rate', 5, 2)->nullable();
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
        Schema::dropIfExists('user_metrics');
    }
};
