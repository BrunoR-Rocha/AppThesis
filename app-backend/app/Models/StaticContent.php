<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaticContent extends Model
{
    protected $fillable = ['key', 'title', 'content', 'image_path', 'additional_data'];

    protected $casts = [
        'additional_data' => 'array',
    ];
}
