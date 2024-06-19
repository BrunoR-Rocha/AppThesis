<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'topic_id',
        'difficulty',
        'time_limit'
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'quiz_questions')->withPivot('order')->orderBy('order');
    }

    public function topic()
    {
        return $this->belongsTo(QuestionTopic::class);
    }

    public function userQuizzes()
    {
        return $this->hasMany(UserQuiz::class);
    }

}
