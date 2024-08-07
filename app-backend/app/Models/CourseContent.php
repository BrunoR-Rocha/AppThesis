<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id', 
        'content_type_id', 
        'title', 
        'content'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function contentType()
    {
        return $this->belongsTo(CourseContentType::class, 'content_type_id');
    }

    public function interactiveElements()
    {
        return $this->hasMany(CourseInteractiveElement::class);
    }
}
