<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionnaireAnswersResource;
use App\Models\QuestionnaireAnswers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionnaireAnswersController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, QuestionnaireAnswers::class);

        return $data->returnCollectionAsJsonResponse(QuestionnaireAnswersResource::collection($data->collection('questionnaires_answers')));
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'questionnaire_submission_id' => 'required|integer|exists:questionnaire_submissions,id',
            'questionnaire_question_id' => 'required|integer|exists:questionnaire_questions,id',
            'answer' => 'required|integer',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionnaireAnswers = QuestionnaireAnswers::create([
            'questionnaire_submission_id' => $request->questionnaire_submission_id,
            'questionnaire_question_id' => $request->questionnaire_question_id,
            'answer' => $request->answer,
        ]);

        return response()->json([
            'id' => $questionnaireAnswers->id,
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $questionnaireAnswers = QuestionnaireAnswers::findOrFail($id);

        return new QuestionnaireAnswersResource($questionnaireAnswers);
    }

    public function update(Request $request, $id)
    {
        $questionnaireAnswers = QuestionnaireAnswers::findOrFail($id);
        $questionnaireAnswers->update($request->all());

        return $questionnaireAnswers;
    }
}
