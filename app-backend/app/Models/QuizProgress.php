<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_quiz_id', 
        'answers', 
        'remaining_time'
    ];

    protected $casts = [
        'answers' => 'array',
    ];

    public function userQuiz()
    {
        $this->belongsTo(UserQuiz::class);
    }
}
