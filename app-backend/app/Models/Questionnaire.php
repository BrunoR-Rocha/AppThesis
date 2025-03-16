<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questionnaire extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'description',
        'enabled',
    ];

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }

    public function questionnaireQuestions()
    {
        return $this->hasMany(QuestionnaireQuestion::class);
    }

    public function questionnaireSubmissions()
    {
        return $this->hasMany(QuestionnaireSubmission::class);
    }
}
