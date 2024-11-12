<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseContentType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'tag', 'enabled'];

    public function courseContents()
    {
        return $this->hasMany(CourseContent::class);
    }

    public function scopeTag($query, $tag)
    {
        return $query->where('tag', $tag);
    }

    public function scopeActive($query)
    {
        return $query->where('enabled', true);
    }
}
