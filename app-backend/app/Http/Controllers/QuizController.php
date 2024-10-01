<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\FrontQuizResource;
use App\Http\Resources\QuizResource;
use App\Models\Difficulty;
use App\Models\Question;
use App\Models\QuestionOption;
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
            'title' => 'nullable|string',
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

    public function assemble(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'topic_id' => 'nullable|exists:question_topics,id',
            'difficulty' => 'nullable|integer',
            'is_random' => 'required|boolean'
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $userId = Auth::user()->id ?? 1;

        if ($request->is_random) {
            // Get a random set of questions of several topics, select the quizzes and add to QuizQuestion model, like attach and assign an order
            $questions = Question::inRandomOrder()->take(20)->get();
        } else {
            // check if difficulty and topic is set
            if (!$request->has('topic_id') || !$request->has('difficulty')) {
                return response()->json([
                    'message' => 'No topic provided',
                ], 400);
            }

            // need to do the parsing from the difficulty and the array values
            $difficultyRange = Difficulty::getDifficultyRange($request->difficulty);

            // select a number of questions from a specific topic with the difficulty between the range
            $questions = Question::whereBetween('difficulty', [$difficultyRange[0], $difficultyRange[1]])
                ->whereHas('topics', function ($query) use ($request) {
                    $query->where('id', $request->topic_id);
                })
                ->take(10)
                ->get();

            // TODO: If there's not enough questions generate more
        }

        $quiz = Quiz::create([
            'user_id' => $userId,
        ]);

        foreach ($questions as $index => $question) {
            $quiz->questions()->attach($question->id, ['order' => $index + 1]);
        }

        return response()->json([
            'message' => 'Quiz created',
            'quiz_id' => $quiz->id,
            'questions' => $questions
        ], 200);
    }

    public function getQuizInfo($id)
    {
        $quiz = Quiz::with('questions.options')->findOrFail($id);

        return response()->json(new FrontQuizResource($quiz));
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
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function evaluateQuiz(Request $request, $quizId): float
    {

        dd($request->all());
        $answers = $request->answers;

        $quiz = Quiz::findOrFail($quizId);
        $questions = $quiz->questions;

        if ($questions->isEmpty()) {
            throw new \Exception('Please Try to submit again. If the error persists contact the support');
        }

        $totalQuestions = count($questions);
        $correctAnswers = 0;

        foreach ($answers as $questionId => $answer) {
            // Ensure the question belongs to the quiz
            if (!isset($questions[$questionId])) {
                continue;
            }

            $question = $questions[$questionId];

            dump($question);
            // // Mixed Evaluation
            // if ($evaluationType === 'mixed') {
            //     if ($question->type === 'free_text') {
            //         // Evaluate free_text using LangChain
            //         if ($this->evaluateWithLangChain($question, $answer)) {
            //             $correctAnswers++;
            //         }
            //     } else {
            //         // Evaluate using predefined options
            //         if ($this->evaluatePredefinedAnswer($question, $answer)) {
            //             $correctAnswers++;
            //         }
            //     }
            // }

            // // Unique Evaluation
            // elseif ($evaluationType === 'unique') {
            //     // Evaluate all answers using LangChain
            //     if ($this->evaluateWithLangChain($question, $answer)) {
            //         $correctAnswers++;
            //     }
            // }
        }

        // Calculate the score as a percentage
        $score = ($correctAnswers / $totalQuestions) * 100;

        // Calculate the user metrics after the score


        return round($score, 2); // Return score rounded to 2 decimal places
    }

    /**
     * Evaluate predefined answers (non-free_text questions).
     *
     * @param Question $question The question model.
     * @param mixed    $answer   The submitted answer.
     * @return bool              True if the answer is correct, false otherwise.
     */
    private function evaluatePredefinedAnswer(Question $question, $answer): bool
    {
        // Fetch the correct options for the question
        $correctOptions = QuestionOption::where('question_id', $question->id)
            ->where('is_correct', true)
            ->pluck('option_text')
            ->toArray();

        // Security Validation: Ensure the submitted answer is valid
        $allOptions = QuestionOption::where('question_id', $question->id)
            ->pluck('option_text')
            ->toArray();

        if ($question->type->tag === 'multiple_choice') {
            if (is_array($answer)) {
                // Multiple selections (checkboxes)
                foreach ($answer as $option) {
                    if (!in_array($option, $allOptions)) {
                        return false; // Invalid option selected
                    }
                }
                return empty(array_diff($correctOptions, $answer)) && empty(array_diff($answer, $correctOptions));
            } else {
                return in_array($answer, $correctOptions);
            }
        } elseif ($question->type->tag === 'yes_no') {
            return in_array(strtolower($answer), array_map('strtolower', $correctOptions));
        }

        return false;
    }

    /**
     * Evaluate answers using LangChain (free_text or unique evaluation).
     *
     * @param Question $question The question model.
     * @param mixed    $answer   The submitted answer.
     * @return bool              True if the answer is correct, false otherwise.
     */
    // private function evaluateWithLangChain(Question $question, $answer): bool
    // {
    //     // Prepare the data for LangChain
    //     $prompt = $this->generateLangChainPrompt($question, $answer);

    //     // Security Validation: Sanitize inputs
    //     $sanitizedPrompt = htmlspecialchars($prompt, ENT_QUOTES, 'UTF-8');

    //     // Send the prompt to the LangChain API
    //     $response = $this->callLangChainAPI($sanitizedPrompt);

    //     // Process the response (assuming the API returns a boolean for correctness)
    //     return $response['is_correct'] ?? false;
    // }

    /**
     * Generate a prompt for LangChain based on the question and answer.
     *
     * @param Question $question The question model.
     * @param mixed    $answer   The submitted answer.
     * @return string            The generated prompt.
     */
    // private function generateLangChainPrompt(Question $question, $answer): string
    // {
    //     return "Question: {$question->title}\nAnswer: {$answer}\nEvaluate the correctness of the answer.";
    // }

    /**
     * Call the LangChain API to evaluate the answer.
     *
     * @param string $prompt The prompt to send to LangChain.
     * @return array         The API response.
     */
    // private function callLangChainAPI(string $prompt): array
    // {
    //     // Replace with your actual LangChain API endpoint and parameters
    //     $apiUrl = 'https://your-langchain-api-endpoint.com/evaluate';

    //     $response = Http::post($apiUrl, [
    //         'prompt' => $prompt,
    //     ]);

    //     if ($response->successful()) {
    //         return $response->json();
    //     } else {
    //         throw new \Exception('Error communicating with the LangChain API.');
    //     }
    // }
}
