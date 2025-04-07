<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Difficulty extends Model
{
    use HasFactory;

    // public const VERY_EASY = 'Very Easy';
    // public const EASY = 'Easy';
    // public const NORMAL = 'Normal';
    // public const HARD = 'Hard';
    // public const VERY_HARD = 'Very Hard';

    public static function getStandardDifficulty($id = null, $locale = 'en'): array
    {
        $difficulties = [
            ['id' => 1, 'name' => __('difficulty.very_easy', [], $locale)],
            ['id' => 2, 'name' => __('difficulty.easy', [], $locale)],
            ['id' => 3, 'name' => __('difficulty.normal', [], $locale)],
            ['id' => 4, 'name' => __('difficulty.hard', [], $locale)],
            ['id' => 5, 'name' => __('difficulty.very_hard', [], $locale)],
        ];

        if ($id !== null) {
            $filtered = array_filter($difficulties, function ($difficulty) use ($id) {
                return $difficulty['id'] == $id;
            });

            return array_values($filtered)[0] ?? [];
        }

        return $difficulties;
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

    public static function mapDifficultyToLevel(int $difficultyValue): int
    {
        if ($difficultyValue >= 1 && $difficultyValue <= 20) {
            return 1;
        } elseif ($difficultyValue >= 21 && $difficultyValue <= 40) {
            return 2;
        } elseif ($difficultyValue >= 41 && $difficultyValue <= 60) {
            return 3;
        } elseif ($difficultyValue >= 61 && $difficultyValue <= 80) {
            return 4;
        } elseif ($difficultyValue >= 81 && $difficultyValue <= 100) {
            return 5;
        }

        return 3;
    }


    public static function getEstimatedTime(int $difficultyValue): int
    {
        $difficultyLevel = self::mapDifficultyToLevel($difficultyValue);
        $difficultyTimes = [
            1 => 20,   // Very Easy -> 20 seconds
            2 => 40,   // Easy -> 40 seconds
            3 => 60,   // Normal -> 60 seconds
            4 => 90,   // Hard -> 90 seconds
            5 => 120,  // Very Hard -> 120 seconds
        ];

        return $difficultyTimes[$difficultyLevel] ?? $difficultyTimes[3];
    }
}
