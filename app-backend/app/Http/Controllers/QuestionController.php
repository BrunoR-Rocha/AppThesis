<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\QuestionShowResource;
use App\Models\Difficulty;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\QuestionTopic;
use App\Models\QuestionType;
use App\Models\SysConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Question::class);

        return $data->returnCollectionAsJsonResponse(QuestionResource::collection($data->collection('questions')));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string',
            'type_id' => 'required',
            'explanation' => 'nullable|string',
            'hint' => 'nullable|string',
            'difficulty' => 'nullable|integer',
            'status' => 'nullable|string',
            'tags' => 'nullable|array',
            'image' => 'nullable|image',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $image = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $image = $imagePath;
        }

        $question = Question::create([
            'title' => $request->title,
            'explanation' => $request->explanation,
            'hint' => $request->hint,
            'status' => $request->status,
            'difficulty' => $request->difficulty,
            'tags' => $request->tags,
            'image_path' => $image,
            'type_id' => $request->type_id,
            'user_id' => Auth::user()->id,
        ]);

        return response()->json([
            'id' => $question->id,
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = Question::findOrFail($id);

        return new QuestionResource($question);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'sometimes|string',
            'type_id' => 'sometimes',
            'explanation' => 'nullable|string',
            'hint' => 'nullable|string',
            'difficulty' => 'nullable|integer',
            'status' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'image' => 'nullable|image',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $question = Question::findOrFail($id);
        $image = $question->image_path;

        if (isset($request->image)) {
            Storage::disk('public')->delete($question->image_path);
            $imagePath = $request->file('image')->store('images', 'public');
            $image = $imagePath;
        }

        $question = $question->update([
            'title' => $request->title,
            'explanation' => $request->explanation,
            'hint' => $request->hint,
            'status' => $request->status,
            'difficulty' => $request->difficulty,
            'tags' => $request->tags,
            'image_path' => $image,
            'type_id' => $request->type_id,
            'user_id' => Auth::user()->id ?? 1,
        ]);

        return $question;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $question = Question::findOrFail($id);

        Storage::disk('public')->delete($question->image_path);

        $question->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function generateRandom(Request $request, QuestionTopic $questionTopic = null)
    {
        $theme = SysConfig::tag('theme')->first()->value;
        $topic = isset($questionTopic) ? $questionTopic : QuestionTopic::inRandomOrder()->first();

        if ($topic) {
            $data = [
                'theme' => $theme,
                'topic_tag' => $topic->tag,
                'topic_name' => $topic->name
            ];
        } else {
            // Generate a question without associated Topic
            $data = [
                'theme' => $theme,
            ];
        }

        try {
            $llmUrl = config('llm.url');
            $response = Http::post($llmUrl . '/random-questions', $data);
            if ($response->successful()) {
                $flaskResponse = $response->json();
                $questionsJson = $flaskResponse['response'];
                $questions = json_decode($questionsJson, true);

                if (!is_array($questions)) {
                    return response()->json(['error' => 'Invalid response format from the API']);
                }

                foreach ($questions as $question) {
                    $questionType = QuestionType::tag($question['type'])->first();

                    // If question type doesn't exist or there's already the same question with same type skips
                    if (!$questionType) {
                        continue;
                    }
                    
                    $existingQuestion = Question::where('title', $question['title'])
                        ->where('type_id', $questionType->id)
                        ->first();

                    if ($existingQuestion) {
                        continue;
                    }

                    $newQuestion = Question::create([
                        'title' => $question['title'],
                        'user_id' => 1,
                        'type_id' => $questionType->id,
                        'status' => 'active',
                        'difficulty' => $question['difficulty'],
                        'tags' => $question['tags'],
                    ]);

                    if ($topic) {
                        $newQuestion->topics()->attach($topic->id);
                    }

                    if ($questionType->tag === 'multiple_choice' || $questionType->tag === 'yes_no') {
                        foreach ($question['options'] as $option) {
                            QuestionOption::create([
                                'question_id' => $newQuestion->id,
                                'option_text' => $option['option_text'],
                                'is_correct' => $option['is_correct'],
                            ]);
                        }
                    }
                }

                return response()->json(['message' => 'Questions generated and saved successfully!', 'result' => $questions]);
            } else {
                return response()->json(['error' => 'There was a problem gathering information']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()]);
        }

        return response()->json($response);
    }

    public function getQuizParams(Request $request)
    {
        $topics = QuestionTopic::all();
        $difficulty = Difficulty::getStandardDifficulty();
        
        return response()->json([
            'topics' => $topics,
            'difficulty' => $difficulty
        ]);
    }
}
