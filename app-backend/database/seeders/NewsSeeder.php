<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        News::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            News::create([
                'title' => $faker->sentence(3),
                'body' => $faker->text(300),
                'journal_title' => $faker->sentence,
                'doi' => $faker->domainName,
                'enabled' => true
            ]);
        }
    }
}
