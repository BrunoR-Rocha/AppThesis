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
        Schema::table('library_pages', function (Blueprint $table) {
            $table->text('description')->nullable();
            $table->string('author')->nullable();
            $table->date('date')->nullable();
            $table->string('tag')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('library_pages', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('author');
            $table->dropColumn('date');
            $table->dropColumn('tag');
        });
    }
};
