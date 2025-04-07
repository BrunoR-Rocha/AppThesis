<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\FrontQuizResource;
use App\Http\Resources\QuizResource;
use App\Models\Difficulty;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\QuestionResponse;
use App\Models\QuestionTopic;
use App\Models\Quiz;
use App\Models\QuizProgress;
use App\Models\Response;
use App\Models\SysConfig;
use App\Models\UserDifficultyProgression;
use App\Models\UserMetric;
use App\Models\UserQuiz;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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

        $userId = Auth::user()->id;
        $topicId = null;
        $difficultyLevel = null;

        if ($request->is_random) {
            $questions = Question::inRandomOrder()->take(20)->get();
        } else {
            if (!$request->has('topic_id') || !$request->has('difficulty')) {
                return response()->json([
                    'message' => 'No topic provided',
                ], 400);
            }

            $difficultyLevel = $request->difficulty;

            if (is_null($request->difficulty)) {
                $maxDifficulty = Difficulty::count();

                $difficultyLevel = rand(1, $maxDifficulty);
            }

            $topicId = $request->topic_id;
            if (is_null($request->topic_id)) {
                $topicCollection = QuestionTopic::count();

                $topicId = rand(1, $topicCollection);
            }

            $difficultyRange = Difficulty::getDifficultyRange($difficultyLevel);

            $questions = Question::whereBetween('difficulty', [$difficultyRange[0], $difficultyRange[1]])
                ->whereHas('topics', function ($query) use ($request, $topicId) {
                    $query->where('question_topics.id', $topicId);
                })
                ->take(10)
                ->get();

            if (count($questions) < 10) {
                $questionController = new QuestionController();
                $questionTopic = QuestionTopic::whereId($topicId)->first();

                if ($questionTopic) {
                    $questionController->generateRandom($request, $questionTopic);

                    $questions = Question::whereBetween('difficulty', [$difficultyRange[0], $difficultyRange[1]])
                        ->whereHas('topics', function ($query) use ($request, $topicId) {
                            $query->where('question_topics.id', $topicId);
                        })
                        ->take(10)
                        ->get();
                }
            }
        }

        try {
            $quiz = Quiz::create([
                'user_id' => $userId,
                'topic_id' => $topicId,
                'difficulty' => $difficultyLevel,
            ]);

            UserQuiz::create([
                'user_id' => $userId,
                'quiz_id' => $quiz->id
            ]);

            foreach ($questions as $index => $question) {
                $quiz->questions()->attach($question->id, ['order' => $index + 1]);
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
        }

        return response()->json([
            'message' => 'Quiz created',
            'quiz_id' => $quiz->id,
            'questions' => $questions
        ], 200);
    }

    public function getQuizInfo($id)
    {
        $user = Auth::user();
        $quiz = Quiz::with('questions.options')->findOrFail($id);

        $userQuiz = UserQuiz::where('quiz_id', $quiz->id)->where('user_id', $user->id)->first();

        $savedAnswers = [];
        $remainingTime = null;

        if ($userQuiz) {
            $quizProgress = QuizProgress::where('user_quiz_id', $userQuiz->id)->first();

            if ($quizProgress) {
                $savedAnswers = $quizProgress->answers; // Assuming answers are stored as JSON
                $remainingTime = $quizProgress->remaining_time;
            }
        }

        return response()->json([
            'params' => [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'description' => $quiz->description,
                'difficulty' => $quiz->difficulty,
                'time_limit' => $remainingTime ?? $quiz->time_limit ?? $quiz->estimatedCompletionTime(),
            ],
            'questions' => $quiz->questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'title' => $question->title,
                    'type' => $question->type->tag,
                    'options' => $question->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'option_text' => $option->option_text,
                        ];
                    }),
                ];
            }),
            'saved_answers' => $savedAnswers,
        ]);
    }

    public function getQuizReview($id)
    {
        $user = Auth::user();

        $userQuiz = UserQuiz::where('user_id', $user->id)->where('quiz_id', $id)->first();

        if (!$userQuiz) {
            return response()->json([
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        if (!$userQuiz->is_completed) {
            return response()->json([
                'message' => 'Not finished yet. Please reload and try again.',
            ], 400);
        }

        $answers = $userQuiz->quizProgress?->answers;
        $responses = $userQuiz->questionResponses;

        $questions = $responses->map(function ($response) {
            $question = $response->question;

            return [
                'question_id' => $question->id,
                'question_text' => $question->title,
                'question_tags' => $question->tags,
                'question_type' => $question->type->tag,
                'question_options' => $question->options->map(function ($option) {
                    return [
                        'option_id' => $option->id,
                        'option_text' => $option->option_text,
                        'is_correct' => $option->is_correct,
                    ];
                })->toArray(),
                'is_correct' => $response->is_correct,
                'response_quality_score' => $response->response_quality_score,
            ];
        });

        return response()->json([
            'score' => $userQuiz->score,
            'time' => $userQuiz->time_taken,
            'answers' => $answers,
            'questions' => $questions,
        ], 200);
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

    public function saveProgress(Request $request, $quizId)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
        ]);

        $user = $request->user();

        $userQuiz = UserQuiz::where(['user_id' => $user->id, 'quiz_id' => $quizId])->first();
        $progress = QuizProgress::where('user_quiz_id', $userQuiz->id)->first();

        $startTime = Carbon::createFromFormat('Y-m-d H:i:s', $userQuiz->created_at);
        $endTime = now();
        $timeTaken = $endTime->diffInSeconds($startTime);

        if ($progress) {
            $progress->update([
                'answers' => $validated['answers'],
                'remaining_time' => $timeTaken,
            ]);
        } else {
            $progress = QuizProgress::create([
                'user_quiz_id' => $userQuiz->id,
                'answers' => $validated['answers'],
                'remaining_time' => $timeTaken,
            ]);
        }

        return response()->json([
            'message' => 'Progress saved successfully',
        ], 200);
    }

    public function evaluateQuiz(Request $request, $quizId)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $user = Auth::user();
        $quiz = Quiz::findOrFail($quizId);
        $questions = $quiz->questions;
        $answers = $request->answers;
        $userQuiz = UserQuiz::where(['user_id' => $user->id, 'quiz_id' => $quiz->id])->first();

        $startTime = Carbon::createFromFormat('Y-m-d H:i:s', $userQuiz->created_at);
        $endTime = now();
        $timeTaken = $endTime->diffInSeconds($startTime);

        if ($questions->isEmpty()) {
            throw new \Exception('Please Try to submit again. If the error persists contact the support');
        }

        $totalQuestions = count($questions);
        $evaluatedData = $this->evaluateAnswers($questions, $answers);

        $correctAnswers = $evaluatedData['correctAnswers'];
        $questionResponses = $evaluatedData['questionResponses'];

        $score = ($correctAnswers / $totalQuestions) * 100;

        $userQuiz = UserQuiz::updateOrCreate(
            [
                'user_id' => $user->id,
                'quiz_id' => $quiz->id
            ],
            [
                'score' => round($score, 2),
                'time_taken' => $timeTaken,
                'completed_at' => $endTime,
                'is_completed' => true,
            ]
        );

        foreach ($questionResponses as $response) {
            $answer = is_array($response['answer']) ? json_encode($response['answer']) : $response['answer'];
            $suggestedAnswer = is_array($response['suggested_answer']) ? json_encode($response['suggested_answer']) : $response['suggested_answer'];

            QuestionResponse::updateOrCreate([
                'user_quiz_id' => $userQuiz->id,
                'question_id' => $response['question_id']
            ], [
                'is_correct' => $response['is_correct'],
                'response_quality_score' => $response['response_quality_score'],
                'time_taken' => $response['time_taken'],
                'answer' => $answer,
                'suggested_answer' =>  $suggestedAnswer,
            ]);
        }

        $this->updateUserMetrics($user->id);

        return response()->json([
            'message' => 'Quiz submitted successfully.',
            'score' => round($score, 2),
        ], 200);
    }

    public function assessQuiz(Request $request, $quizId)
    {
        $quiz = Quiz::findOrFail($quizId);

        $userQuiz = UserQuiz::where('quiz_id', $quiz->id)->first();

        $questions = $quiz->questions;
        $answers = $userQuiz->questionResponses->pluck('answer', 'question_id')->toArray();
        $evaluation = $this->evaluateAnswers($questions, $answers, true);

        return response()->json([
            'message' => 'Avaliação testada com sucesso',
            'data' => $evaluation
        ], 200);
    }

    private function evaluateAnswers($questions, $answers)
    {
        $correctAnswers = 0;
        $questionResponses = [];

        foreach ($answers as $questionId => $answer) {
            $question = $questions->firstWhere('id', $questionId);

            if (!$question) {
                continue;
            }

            if ($question->type->tag === 'free_text') {
                $evaluationResult = $this->evaluateWithLangChain($question, $answer);
            } else {

                $isCorrect = $this->evaluatePredefinedAnswer($question, $answer);
                $evaluationResult = [
                    'is_correct' => $isCorrect,
                    'response_quality_score' => null,
                    'time_taken' => null,
                ];
            }

            if ($evaluationResult['is_correct']) {
                $correctAnswers++;
            }

            $questionResponses[] = [
                'question_id' => $questionId,
                'question_options' => $question->options,
                'answer' => $answer,
                'is_correct' => $evaluationResult['is_correct'],
                'response_quality_score' => $evaluationResult['response_quality_score'],
                'time_taken' => $evaluationResult['time_taken'] ?? null,
                'suggested_answer' => $evaluationResult['suggested_answer'] ?? null,
            ];
        }

        return [
            'correctAnswers' => $correctAnswers,
            'questionResponses' => $questionResponses
        ];
    }
    /**
     * Evaluate predefined answers (non-free_text questions).
     *
     * @param Question $question The question model.
     * @param mixed    $answer   The submitted answer.
     * @return bool              True if the answer is correct, false otherwise.
     */
    private function evaluatePredefinedAnswer(Question $question, $answer, $debug = false): bool
    {
        $correctOptions = QuestionOption::where('question_id', $question->id)
            ->where('is_correct', true)
            ->pluck('option_text')
            ->toArray();

        $allOptions = QuestionOption::where('question_id', $question->id)
            ->pluck('option_text')
            ->toArray();

        if ($question->type->tag === 'multiple_choice') {

            $parsedAnswer = $answer;
            if ($debug) {
                $parsedAnswer = json_decode($answer, true);
            }

            if (is_array($parsedAnswer)) {
                foreach ($answer as $option => $optionValue) {
                    if ($option == 'option_text' && !in_array($optionValue, $allOptions)) {
                        return false;
                    }
                }

                return empty(array_diff($correctOptions, [$parsedAnswer['option_text']])) && empty(array_diff([$parsedAnswer['option_text']], $correctOptions));
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
    private function evaluateWithLangChain(Question $question, $answer)
    {
        $data = [
            'theme' => SysConfig::tag('theme')->first()->value,
            'question' => $question->title,
            'answer' => is_string($answer) ? $answer : strval($answer)
        ];

        $responseLangchain = $this->callLangChainAPI($data);
        $response = json_decode($responseLangchain['response'], true);

        if ($response) {
            return [
                'is_correct' => $response[0]['is_correct'],
                'response_quality_score' => $response[0]['response_quality_score'],
                'time_taken' => null,
            ];
        } else {
            return [
                'is_correct' => false,
                'response_quality_score' => 0,
                'time_taken' => null,
            ];
        }
    }

    /**
     * Call the LangChain API to evaluate the answer.
     *
     * @param string $prompt The prompt to send to LangChain.
     * @return array         The API response.
     */
    private function callLangChainAPI($data)
    {

        $llmUrl = config('llm.url');
        $response = Http::post($llmUrl . '/question-evaluate', $data);

        if ($response->successful()) {
            return $response->json();
        } else {
            throw new \Exception('Error communicating with the LangChain API.');
        }
    }

    protected function updateUserMetrics($userId)
    {
        // Overall Score
        $overallScore = UserQuiz::where('user_id', $userId)->avg('score');

        // Accuracy Rate
        $correctAnswers = QuestionResponse::whereHas('userQuiz', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->where('is_correct', true)->count();

        $totalQuestions = QuestionResponse::whereHas('userQuiz', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->count();

        $accuracyRate = ($totalQuestions > 0) ? ($correctAnswers / $totalQuestions) * 100 : 0;

        // Time Efficiency
        $averageTimePerQuiz = UserQuiz::where('user_id', $userId)->avg('time_taken');

        // Score Standard Deviation
        $scores = UserQuiz::where('user_id', $userId)->pluck('score')->toArray();
        $scoreStandardDeviation = $this->calculateStandardDeviation($scores);

        // Completion Rate
        // Assuming you track quizzes started in a 'quiz_starts' table
        $quizzesStarted = UserQuiz::where('user_id', $userId)->count(); // Implement this as needed
        $quizzesCompleted = UserQuiz::where('user_id', $userId)->where('is_completed', true)->count();
        $completionRate = ($quizzesStarted > 0) ? ($quizzesCompleted / $quizzesStarted) * 100 : 0;

        // Improvement Rate
        $improvementRate = $this->calculateImprovementRate($scores);

        // Learning Curve Efficiency (using improvement rate)
        $learningCurveEfficiency = $improvementRate;

        // Update or create the user metrics record
        UserMetric::updateOrCreate(
            ['user_id' => $userId],
            [
                'overall_score' => round($overallScore, 2),
                'accuracy_rate' => round($accuracyRate, 2),
                'time_efficiency' => round($averageTimePerQuiz, 2),
                'score_standard_deviation' => round($scoreStandardDeviation, 2),
                'improvement_rate' => round($improvementRate, 2),
                'learning_curve_efficiency' => round($learningCurveEfficiency, 2),
                'completion_rate' => round($completionRate, 2),
            ]
        );

        // Update Difficulty Progression
        $this->updateUserDifficultyProgression($userId);
    }

    protected function calculateStandardDeviation($scores)
    {
        $n = count($scores);
        if ($n === 0) {
            return 0;
        }
        $mean = array_sum($scores) / $n;
        $sumSquaredDifferences = array_reduce($scores, function ($carry, $item) use ($mean) {
            return $carry + pow($item - $mean, 2);
        }, 0);
        return sqrt($sumSquaredDifferences / $n);
    }

    protected function calculateImprovementRate($scores)
    {
        $numScores = count($scores);
        if ($numScores < 2) {
            return 0;
        }

        $initialScore = $scores[0];
        $latestScore = $scores[$numScores - 1];

        $improvementRate = ($initialScore != 0) ? (($latestScore - $initialScore) / $initialScore) * 100 : 0;

        return $improvementRate;
    }

    protected function updateUserDifficultyProgression($userId)
    {
        $userQuizzes = UserQuiz::where('user_id', $userId)->with('quiz')->get();

        $quizzesByDifficulty = $userQuizzes->groupBy('quiz.difficulty');

        foreach ($quizzesByDifficulty as $difficultyLevel => $userQuizzesGroup) {
            $averageScore = $userQuizzesGroup->avg('score');
            $quizIds = $userQuizzesGroup->pluck('id');

            $correctAnswers = QuestionResponse::whereIn('user_quiz_id', $quizIds)
                ->where('is_correct', true)
                ->count();

            $totalResponses = QuestionResponse::whereIn('user_quiz_id', $quizIds)
                ->count();

            $accuracyRate = ($totalResponses > 0) ? ($correctAnswers / $totalResponses) * 100 : 0;

            UserDifficultyProgression::updateOrCreate(
                ['user_id' => $userId, 'difficulty_level' => $difficultyLevel],
                [
                    'average_score' => round($averageScore, 2),
                    'accuracy_rate' => round($accuracyRate, 2),
                ]
            );
        }
    }

    public function getUserQuizDashboard(Request $request)
    {
        $user = $request->user();

        $userQuizzes = UserQuiz::where('user_id', $user->id)->get();

        $totalScore = $userQuizzes->sum('score');
        $userMetrics = UserMetric::where('user_id', $user->id)->first();

        $finished = $userQuizzes->filter(function ($quiz) {
            return $quiz->is_completed;
        })->count();

        $unfinished = $userQuizzes->count() - $finished;

        $totalQuizzes = $userQuizzes->count();

        $percentageFinished = $totalQuizzes > 0 ? round(($finished / $totalQuizzes) * 100, 2) : 0;
        $percentageUnfinished = $totalQuizzes > 0 ? round(($unfinished / $totalQuizzes) * 100, 2) : 0;

        $metrics = $userMetrics ? $userMetrics->toArray() : [];
        $metrics = array_merge($metrics, [
            'totalScore' => round($totalScore, 2),
            'finished_quizzes' => $finished,
            'percentage_finished_quizzes' => $percentageFinished,
            'unfinished_quizzes' => $unfinished,
            'percentage_unfinished_quizzes' => $percentageUnfinished,
        ]);

        return response()->json([
            'metrics' => $metrics,
            'quizzes' => $userQuizzes->map(function ($quiz) {
                return [
                    'quiz_id' => $quiz->quiz_id,
                    'quiz_difficulty' => Difficulty::getStandardDifficulty($quiz->quiz->difficulty),
                    'title' => $quiz->quiz->title,
                    'score' => $quiz->score,
                    'completed_at' => Carbon::parse($quiz->completed_at)->format('d/m/Y'),
                    'is_completed' => $quiz->is_completed,
                ];
            })
        ], 200);
    }
}
