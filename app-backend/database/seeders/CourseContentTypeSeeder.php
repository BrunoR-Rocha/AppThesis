<?php

namespace Database\Seeders;

use App\Models\CourseContentType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
class CourseContentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ['E-book', 'Video', 'Podcast', 'Article', 'Interactive Video'];

        foreach ($types as $type) {
            CourseContentType::firstOrCreate(
                ['name' => $type],
                [
                    'tag' => Str::snake(Str::lower($type)),
                    'enabled' => true
                ]
            );
        }
    }
}
