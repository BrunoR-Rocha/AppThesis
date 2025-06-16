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
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->index('user_id', 'questions_user_id_index');
            $table->index('type_id', 'questions_type_id_index');
            $table->index('difficulty', 'questions_difficulty_index');
        });

        Schema::table('user_quizzes', function (Blueprint $table) {
            $table->index('user_id', 'user_quizzes_user_id_index');
            $table->index('quiz_id', 'user_quizzes_quiz_id_index');
        });

        Schema::table('question_responses', function (Blueprint $table) {
            $table->index('user_quiz_id', 'question_responses_user_quiz_id_index');
            $table->index('question_id', 'question_responses_question_id_index');
        });

        Schema::table('question_options', function (Blueprint $table) {
            $table->index('question_id', 'question_options_question_id_index');
        });

        Schema::table('quiz_progress', function (Blueprint $table) {
            $table->index('user_quiz_id', 'quiz_progress_user_quiz_id_index');
        });

        Schema::table('library_page_modules', function (Blueprint $table) {
            $table->index('library_page_id', 'library_page_modules_library_page_id_index');
        });
    }

    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropIndex('questions_user_id_index');
            $table->dropIndex('questions_type_id_index');
            $table->dropIndex('questions_difficulty_index');
        });

        Schema::table('user_quizzes', function (Blueprint $table) {
            $table->dropIndex('user_quizzes_user_id_index');
            $table->dropIndex('user_quizzes_quiz_id_index');
        });

        Schema::table('question_responses', function (Blueprint $table) {
            $table->dropIndex('question_responses_user_quiz_id_index');
            $table->dropIndex('question_responses_question_id_index');
        });

        Schema::table('question_options', function (Blueprint $table) {
            $table->dropIndex('question_options_question_id_index');
        });

        Schema::table('quiz_progress', function (Blueprint $table) {
            $table->dropIndex('quiz_progress_user_quiz_id_index');
        });

        Schema::table('library_page_modules', function (Blueprint $table) {
            $table->dropIndex('library_page_modules_library_page_id_index');
        });
    }
};
