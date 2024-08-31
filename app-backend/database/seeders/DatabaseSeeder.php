<?php

namespace Database\Seeders;

use App\Models\SysConfig;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       $this->call([
            SysConfigSeeder::class, 
            RoleSeeder::class, 
            UserSeeder::class,
            FaqSeeder::class, 
            NewsSeeder::class,
            ForumCategoriesSeeder::class,
            // QuestionSeeder::class
       ]);
    }
}
