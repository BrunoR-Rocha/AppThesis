<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Faq::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            Faq::create([
                'title' => $faker->sentence,
                'body' => $faker->text,
                'section' => 'general',
                'enabled' => true
            ]);
        }
        for ($i = 0; $i < 5; $i++) {
            Faq::create([
                'title' => $faker->sentence,
                'body' => $faker->text,
                'section' => 'quiz',
                'enabled' => true
            ]);
        }
    }
}
