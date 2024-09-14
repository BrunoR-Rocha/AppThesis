<?php

namespace Database\Seeders;

use App\Models\QuestionTopic;
use App\Models\SysConfig;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class QuestionTopicSeeder extends Seeder
{
    public function run()
    {
        try {
            $theme = SysConfig::tag('theme')->first()->value;

            $llmUrl = config('llm.url');
            $response = Http::post($llmUrl . '/question-topic', [
                'theme' => $theme,
            ]);

            if ($response->successful()) {
                $flaskResponse = $response->json();
                $topicsJson = $flaskResponse['response'];
                $topics = json_decode($topicsJson, true);

                if (!is_array($topics)) {
                    throw new \Exception('Invalid response format from the API');
                }

                foreach ($topics as $topic) {
                    QuestionTopic::updateOrCreate(
                        ['tag' => $topic['tag']], 
                        ['name' => $topic['name']]
                    );
                }

                $this->command->info('Question topics generated and saved successfully!');
            } else {
                $this->command->error('Failed to generate question topics.');
            }
        } catch (\Exception $e) {
            $this->command->error('An error occurred: ' . $e->getMessage());
        }
    }
}
