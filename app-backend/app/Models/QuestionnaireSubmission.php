<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireSubmission extends Model
{
    use HasFactory;

    public $fillable = [
        'questionnaire_id',
        'user_id',
        'submited_at',
    ];

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function answers()
    {
        return $this->hasMany(QuestionnaireAnswers::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
