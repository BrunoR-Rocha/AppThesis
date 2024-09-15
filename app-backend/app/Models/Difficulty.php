<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Difficulty extends Model
{
    use HasFactory;

    public const VERY_EASY = 'Very Easy';
    public const EASY = 'Easy';
    public const NORMAL = 'Normal';
    public const HARD = 'Hard';
    public const VERY_HARD = 'Very Hard';

    public static function getStandardDifficulty(): array
    {
        return [
            ['id' => 1, 'name' => self::VERY_EASY],
            ['id' => 2, 'name' => self::EASY],
            ['id' => 3, 'name' => self::NORMAL],
            ['id' => 4, 'name' => self::HARD],
            ['id' => 5, 'name' => self::VERY_HARD],
        ];
    }
}
