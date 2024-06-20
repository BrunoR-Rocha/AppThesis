<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\QuestionTopic;
use Illuminate\Database\Seeder;
use \Faker\Factory as Faker;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Question::truncate();
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            $question = Question::create([
                'title' => $faker->sentence,
                'user_id' => 3,
                'type_id' => 2,
                'status' => 'active',
                'difficulty' => $faker->numberBetween(1, 10),
                'explanation' => $faker->sentence,
                'hint' => $faker->sentence,
            ]);

            $topics = QuestionTopic::inRandomOrder()->take(rand(1, 8))->pluck('id');
            $question->topics()->attach($topics);
        }
    }
}
