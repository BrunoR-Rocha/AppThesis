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

    public static function getDifficultyRange($difficultyLevel)
    {
        switch ($difficultyLevel) {
            case 1: 
                return [1, 20];
            case 2:
                return [21, 40];
            case 3:
                return [41, 60];
            case 4:
                return [61, 80];
            case 5:
                return [81, 100];
            default:
                return [1, 100];
        }
    }

}
