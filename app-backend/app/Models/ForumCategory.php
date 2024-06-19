<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'tag',
        'active'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function scopeTag($query, $tag)
    {
        return $query->active()->where('tag', $tag);
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function forumThreads()
    {
        return $this->hasMany(ForumThread::class);
    }
}
