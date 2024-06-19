<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'forum_thread_id',
        'body'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function forumThread()
    {
        return $this->belongsTo(ForumThread::class);
    }
}
