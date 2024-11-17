<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumThread extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'forum_category_id',
        'user_id',
        'image_path'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function forumCategory()
    {
        return $this->belongsTo(ForumCategory::class);
    }

    public function forumPosts()
    {
        return $this->hasMany(ForumPost::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(ForumThreadLike::class);
    }

    public function isLikedBy(User $user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    public function like(User $user)
    {
        if (!$this->isLikedBy($user)) {
            $this->likes()->create(['user_id' => $user->id]);
        }
    }

    public function unlike(User $user)
    {
        if ($this->isLikedBy($user)) {
            $this->likes()->where('user_id', $user->id)->delete();
        }
    }

    public function nextThread()
    {
        return self::where('id', '>', $this->id)
            ->orderBy('id', 'asc')
            ->first();
    }
}
