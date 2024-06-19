<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'publisher',
        'link', 
        'cite_score', 
        'subject_area', 
        'issn', 
        'coverage_start', 
        'coverage_end',
        'doi_breakdown_by_year',
        'enabled'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = [
        'subject_area' => 'array',
        'issn' => 'array',
        'doi_breakdown_by_year' => 'array'  
    ];

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }
}
