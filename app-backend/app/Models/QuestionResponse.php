<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionResponse extends Model
{
    protected $fillable = [
        'user_quiz_id',
        'question_id',
        'is_correct',
        'response_quality_score',
        'time_taken',
        'answer',
        'suggested_answer'
    ];

    public function userQuiz()
    {
        return $this->belongsTo(UserQuiz::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
