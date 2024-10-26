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
        'short_description',
        'description',
        'average_time',
        'difficulty',
        'file_path',
        'topic_id',
        'enabled'
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function questionTopic()
    {
        return $this->belongsTo(QuestionTopic::class, 'topic_id');
    }

    public function courseContents()
    {
        return $this->hasManyThrough(CourseContent::class, Lesson::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(CourseSubscription::class);
    }

    public function isUserSubscribed(User $user)
    {
        return $this->subscriptions()->where('user_id', $user->id)->exists();
    }

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }
}
