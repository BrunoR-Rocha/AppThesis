<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
