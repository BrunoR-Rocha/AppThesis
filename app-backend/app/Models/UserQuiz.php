<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserQuiz extends Model
{
    protected $table = 'user_quizzes';

    protected $fillable = [
        'user_id',
        'quiz_id',
        'score',
        'time_taken',
        'is_completed',
        'completed_at'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function questionResponses()
    {
        return $this->hasMany(QuestionResponse::class, 'user_quiz_id');
    } 
}
