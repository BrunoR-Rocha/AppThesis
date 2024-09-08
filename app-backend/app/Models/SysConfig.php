<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SysConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag',
        'description', 
        'value',
        'input_type',
        'input_rules'
    ];

    public function scopeTag($query, $tag)
    {
        return $query->where('tag', $tag);
    }

    public static function getValueByTag($tag)
    {
        return self::where('tag', $tag)->first()->value ?? null;
    }

}
