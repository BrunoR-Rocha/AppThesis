<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireAnswers extends Model
{
    use HasFactory;

    public $fillable = [
        'questionnaire_submission_id',
        'questionnaire_question_id',
        'answer',
    ];

    public function submission()
    {
        return $this->belongsTo(QuestionnaireSubmission::class);
    }

    public function question()
    {
        return $this->belongsTo(QuestionnaireQuestion::class);
    }
}
