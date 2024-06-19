<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailTemplate extends Model
{
    use HasFactory;

    public $fillable = [
        'tag',
        'from',
        'description',
        'content',
        'enabled',
    ];

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }

    public function scopeTag($query, $tag)
    {
        return $query->where('tag', $tag);
    }

}
