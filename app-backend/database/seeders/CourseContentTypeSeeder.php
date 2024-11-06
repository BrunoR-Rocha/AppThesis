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
        $types = ['Video', 'Quiz', 'Text', 'Article', 'Assignment', 'Interactive Video'];

        foreach ($types as $type) {
            CourseContentType::firstOrCreate(
                ['tag' => Str::snake(Str::lower($type))],
                [
                    'name' => $type,
                    'enabled' => true
                ]
            );
        }
    }
}
