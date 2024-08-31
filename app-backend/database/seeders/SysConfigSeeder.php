<?php

namespace Database\Seeders;

use App\Models\SysConfig;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SysConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SysConfig::firstOrCreate(
            ['tag' => 'theme'],
            [
                'value' => 'Sleep',
                'description' => 'Tema central do sistema',
                'input_type' => 'text'
            ]
        );
    }
}
