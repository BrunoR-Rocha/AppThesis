<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionnaireQuestion extends Model
{
    use HasFactory;

    public $fillable = [
        'questionnaire_id',
        'question',
        'order',
        'enabled',
    ];

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }
}
