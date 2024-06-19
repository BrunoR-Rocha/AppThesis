<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'subject',
        'email',
        'message',
        'archived',
        'email_sent'
    ];

    public function scopeArchived($query, $value)
    {
        return $query->where('archived', $value);
    }
}
