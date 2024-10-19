<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDifficultyProgression extends Model
{
    protected $fillable = [
        'user_id',
        'difficulty_level',
        'average_score',
        'accuracy_rate',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
