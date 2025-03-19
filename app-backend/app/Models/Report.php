<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'anonymous',
        'name',
        'email',
        'phone',
        'subject',
        'report_date',
        'description',
    ];

    protected $casts = [
        'anonymous'   => 'boolean',
        'report_date' => 'date',
    ];
}
