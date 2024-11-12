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

    public function getUserSubscribedDateAttribute()
    {
        $subscription = $this->subscriptions()->where('user_id', Auth::user()->id)->first();
        return $subscription ? $subscription->created_at : null;
    }

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }

    public function getGeneralProgressAttribute()
    {
        $userId = Auth::user()->id;

        if (!$userId) {
            return 0;
        }

        $totalLessons = $this->lessons()->count();
        if ($totalLessons === 0) {
            return 0;
        }

        $userProgress = CourseProgress::where('user_id', $userId)
            ->where('course_id', $this->id)
            ->sum('progress');

        $generalProgress = $userProgress / $totalLessons;

        return round($generalProgress, 2);
    }

    public function ratings()
    {
        return $this->hasMany(CourseRating::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating');
    }

    public function getRatingsCountAttribute()
    {
        return $this->ratings()->count();
    }
}
