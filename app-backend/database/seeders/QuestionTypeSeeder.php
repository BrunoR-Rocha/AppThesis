<?php

namespace Database\Seeders;

use App\Models\QuestionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class QuestionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questionTypes = ['Yes No', 'Multiple Choice', 'Free Text'];

        foreach ($questionTypes as $type) {
            QuestionType::firstOrCreate(
                ['tag' => Str::snake(Str::lower($type))],
                ['name' => $type]
            );
        }
    }
}
