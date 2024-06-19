<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'body', 
        'section', 
        'enabled'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }
    
    // public function toSearchableArray()
    // {
    //     return [
    //         'title' => '',
    //         'body' => '',
    //     ];
    // }
}
