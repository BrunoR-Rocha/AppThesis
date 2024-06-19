<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body', 
        'journal_title',
        'doi',
        'enabled'
    ];

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }
}
