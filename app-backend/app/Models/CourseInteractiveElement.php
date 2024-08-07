<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseInteractiveElement extends Model
{
    use HasFactory;

    protected $fillable = ['content_id', 'type', 'data'];

    public function content()
    {
        return $this->belongsTo(CourseContent::class, 'content_id');
    }
}
