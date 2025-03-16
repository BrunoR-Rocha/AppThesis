<?php

namespace App\Models;

use App\Notifications\CustomVerifyEmail;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable, CanResetPasswordTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'birth_date',
        'guest'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function courseSubscriptions()
    {
        return $this->hasMany(CourseSubscription::class);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new CustomVerifyEmail);
    }

    public function difficultyProgressions()
    {
        $this->hasMany(UserDifficultyProgression::class);
    }

    public function metrics()
    {
        $this->hasMany(UserMetric::class);
    }

    public function userQuizzes()
    {
        $this->hasMany(UserQuiz::class);
    }

    public function favorites()
    {
        return $this->hasMany(UserFavorite::class);
    }

    public function favoriteItems()
    {
        return $this->morphMany(UserFavorite::class, 'favoritable');
    }
}
