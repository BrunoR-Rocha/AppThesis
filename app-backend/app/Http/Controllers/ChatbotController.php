<?php

namespace App\Http\Controllers;

use App\Models\SysConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $theme = SysConfig::tag('theme')->first()->value;

        $data = [
            'message' => $validated['message'],
            'theme' => $theme,
        ];

        try {
            $llmUrl = config('llm.url');
            $response = Http::post($llmUrl . '/chat', $data);

            if ($response->successful()) {
                $flaskResponse = $response->json();

                // add chat message to session or other storage
                // send the message to the user.

                dd($flaskResponse);
            } else {
                return back()->withErrors(['error' => 'There was a problem gathering information']);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An error occurred: ' . $e->getMessage()]);
        }

        return response()->json($response);
    }

    public function health(Request $request)
    {
        try {
            $llmUrl = config('llm.url');
            $response = Http::timeout(5)->get($llmUrl . '/healthcheck');
            if ($response->successful()) {
                return response()->json([
                    'status' => 'healthy',
                    'langchain' => 'healthy',
                ], 200);
            } else {
                return response()->json([
                    'status' => 'unhealthy',
                    'langchain' => 'unhealthy',
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'unhealthy',
                'langchain' => 'unreachable',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
