<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'average_time', 
        'difficulty', 
        'file_path', 
        'topic_id'
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function questionTopic()
    {
        return $this->belongsTo(QuestionTopic::class, 'topic_id');
    }

    public function subscriptions()
    {
        return $this->hasMany(CourseSubscription::class);
    }

    public function isSubscribed()
    {
        $user = Auth::user();
        if (!$user) {
            return false;
        }

        return $this->subscriptions()->where('user_id', $user->id)->exists();
    }

    public function isUserSubscribed(User $user)
    {
        return $this->subscriptions()->where('user_id', $user->id)->exists();
    }
}
