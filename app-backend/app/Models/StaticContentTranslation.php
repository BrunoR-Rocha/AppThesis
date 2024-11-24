<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaticContentTranslation extends Model 
{
    public $timestamps = false;

    protected $fillable = [
        'locale', 
        'title', 
        'content'
    ];
}
