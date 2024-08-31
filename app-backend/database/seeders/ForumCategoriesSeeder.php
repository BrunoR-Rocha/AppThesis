<?php

namespace Database\Seeders;

use App\Models\ForumCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ForumCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['Medicine', 'General Discussion', 'Support', 'Off Topic'];

        foreach ($categories as $cat) {
            ForumCategory::firstOrCreate(
                ['tag' => Str::snake(Str::lower($cat))],
                [
                    'name' => $cat,
                    'active' => true
                ]
            );
        }
    }
}
