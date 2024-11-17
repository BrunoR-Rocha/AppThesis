<?php

namespace Database\Seeders;

use App\Models\StaticContent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaticContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StaticContent::create([
            'key' => 'hero_section',
            'title' => 'Awaken your sleep & health Knowledge',
            'content' => 'Learn more about sleep and health...',
            'image_path' => 'images/hero.svg',
        ]);

        StaticContent::create([
            'key' => 'about_section',
            'title' => 'What is Moony',
            'content' => 'At vero eos et accusamus...',
            'image_path' => 'images/about.svg',
        ]);

        StaticContent::create([
            'key' => 'features_section',
            'title' => 'Our Features',
            'content' => '',
            'additional_data' => [
                'features' => [
                    [
                        'text' => 'Discussions and community support.',
                        'icon' => 'ForumOutlinedIcon',
                    ],
                    [
                        'text' => 'Interactive quizzes to test your knowledge.',
                        'icon' => 'LiveHelpOutlinedIcon',
                    ],
                    [
                        'text' => 'Comprehensive courses on various topics.',
                        'icon' => 'SchoolOutlinedIcon',
                    ],
                    [
                        'text' => 'AI-based personalized learning paths.',
                        'icon' => 'QueryStatsOutlinedIcon',
                    ],
                    [
                        'text' => 'Memory enhancement tools and resources.',
                        'icon' => 'MemoryOutlinedIcon',
                    ],
                    [
                        'text' => 'AI-based evaluation system.',
                        'icon' => 'AutoStoriesOutlinedIcon',
                    ],
                ],
            ],
        ]);

        StaticContent::create([
            'key' => 'tools_section',
            'title' => 'Tools used in this project',
            'content' => '',
            'additional_data' => [
                'tools' => [
                    ['image_path' => 'tech/tool1.svg'],
                    ['image_path' => 'tech/tool2.svg'],
                    ['image_path' => 'tech/tool3.svg'],
                    ['image_path' => 'tech/tool4.svg'],
                    ['image_path' => 'tech/tool5.svg'],
                    ['image_path' => 'tech/tool6.svg'],
                    ['image_path' => 'tech/tool7.svg'],
                    ['image_path' => 'tech/tool8.svg'],
                ],
            ],
        ]);
    }
}
