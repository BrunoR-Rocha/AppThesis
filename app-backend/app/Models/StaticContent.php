<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Translatable;

class StaticContent extends Model
{
    use Translatable;

    protected $fillable = [
        'tag',
    ];

    public $translatedAttributes = ['title', 'content'];

    public function translations()
    {
        return $this->hasMany(StaticContentTranslation::class);
    }
    
}
