<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'question_id',
        'user_id',
        'difficulty',
    ];

    public $timestamps = false;
}
