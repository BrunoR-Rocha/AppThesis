<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibraryPageModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'content',
        'library_page_id',
        'position'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function libraryPage()
    {
        return $this->belongsTo(LibraryPage::class);
    }
}
