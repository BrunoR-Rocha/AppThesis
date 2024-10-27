<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class LibraryPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'author',
        'date',
        'tag'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function libraryPageModules()
    {
        return $this->hasMany(LibraryPageModule::class)->orderBy('position');
    }

    public function favorites()
    {
        return $this->morphMany(UserFavorite::class, 'favoritable');
    }

    public function isFavoritedByUser()
    {
        $user = Auth::user();
        if (!$user) {
            return false;
        }
        
        return $this->favorites()->where('user_id', $user->id)->exists();
    }

}
