<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Translatable;

class Faq extends Model
{
    use Translatable;

    protected $fillable = [
        'enabled',
        'tag'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public $translatedAttributes = ['title', 'body'];
    
    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }

    public function translations()
    {
        return $this->hasMany(FaqTranslation::class);
    }
}
