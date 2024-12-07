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

        SysConfig::firstOrCreate(
            ['tag' => 'maintenance'],
            [
                'value' => 'false',
                'description' => 'Gestão de Manutenção do site',
                'input_type' => 'boolean'
            ]
        );

        SysConfig::firstOrCreate(
            ['tag' => 'social_logins'],
            [
                'value' => 'false',
                'description' => 'Gestão de Logins com Redes Sociais',
                'input_type' => 'boolean'
            ]
        );

        SysConfig::firstOrCreate(
            ['tag' => 'mail_send'],
            [
                'value' => 'true',
                'description' => 'Gestão de Envios de Email',
                'input_type' => 'boolean'
            ]
        );
    }
}
