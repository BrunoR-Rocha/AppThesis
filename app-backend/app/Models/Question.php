<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type_id',
        'user_id',
        'explanation',
        'hint',
        'difficulty',
        'status',
        'image_path',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function type()
    {
        return $this->belongsTo(QuestionType::class);
    }

    public function topics()
    {
        return $this->belongsToMany(QuestionTopic::class, 'question_question_topic');
    }

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function options()
    {
        return $this->hasMany(QuestionOption::class);
    }
}
