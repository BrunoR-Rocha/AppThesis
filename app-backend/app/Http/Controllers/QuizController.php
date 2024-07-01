<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuizResource;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\Response;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Quiz::class);

        return $data->returnCollectionAsJsonResponse(QuizResource::collection($data->collection('quizzes')));
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
            'topic_id' => 'required|exists:question_topics,id',
            'description' => 'nullable|string',
            'time_limit' => 'nullable|integer|min:1',
            'difficulty' => 'nullable|integer',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questions = Question::where('difficulty', '<=', $request->difficulty)
                    ->whereHas('topics', function ($query) use ($request) {
                        $query->where('question_topics.id', $request->topic_id);
                    })
                    ->inRandomOrder()
                    ->status('active')
                    ->take(10)
                    ->get();

        $quiz = Quiz::create([
            'title' => $request->title,
            'description' => $request->description,
            'topic_id' => $request->topic_id,
            'user_id' => Auth::user()->id,
            'time_limit' => $request->time_limit,
            'difficulty' => $request->difficulty,
            'start_time' => Carbon::now()
        ]);

        foreach ($questions as $index => $question) {
            $quiz->questions()->attach($question, ['order' => $index + 1]);
        }

        return response()->json([
            'id' => $quiz->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    public function submit(Request $request, $id)
    {
        // Adicionar validação do request
        // 

        $quiz = Quiz::findOrFail($id);

        // Verificar se todas as perguntas do quiz foram respondidas
        $totalQuestions = $quiz->questions()->count();
        $answeredQuestions = Response::where('quiz_id', $quiz->id)
                            ->where('user_id', Auth::user()->id)
                            ->count();

        if ($totalQuestions !== $answeredQuestions) {
            return response()->json(['message' => 'Not all questions answered'], 400);
        }

        // Atualizar o estado do quiz
        $quiz->end_time = Carbon::now();
        $quiz->is_complete = true;
        $quiz->save();

        // Adicionar validação de tempo
        $timeSpent = $quiz->end_time->diffInMinutes($quiz->start_time);

        if ($quiz->time_limit && $timeSpent > $quiz->time_limit) {
            return response()->json(['message' => 'Time limit exceeded'], 400);
        }

        // Adicionar processamento de dados estatísticos do utilizador e score
        // 

        return response()->json(['message' => 'Quiz submitted successfully']);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);

        return new QuizResource($quiz);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);

        $quiz->update($request->all());

        return $quiz;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);

        $quiz->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
