<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMetric extends Model
{
    protected $fillable = [
        'user_id',
        'overall_score',
        'accuracy_rate',
        'time_efficiency',
        'improvement_rate',
        'score_standard_deviation',
        'learning_curve_efficiency',
        'completion_rate',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
