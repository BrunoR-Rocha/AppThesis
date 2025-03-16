<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionnaireQuestionResource;
use App\Models\QuestionnaireQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionnaireQuestionController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, QuestionnaireQuestion::class);

        return $data->returnCollectionAsJsonResponse(QuestionnaireQuestionResource::collection($data->collection('questionnaires_questions')));
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
            'questionnaire_id' => 'required|integer|exists:questionnaires,id',
            'question' => 'required|string|max:255',
            'order' => 'nullable|integer',
            'enabled' => 'required|boolean',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionnaireQuestion = QuestionnaireQuestion::create([
            'questionnaire_id' => $request->questionnaire_id,
            'question' => $request->question,
            'order' => $request->order,
            'enabled' => $request->enabled,
        ]);

        return response()->json([
            'id' => $questionnaireQuestion->id,
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $questionnaireQuestion = QuestionnaireQuestion::findOrFail($id);

        return new QuestionnaireQuestionResource($questionnaireQuestion);
    }

    public function update(Request $request, $id)
    {
        $questionnaireQuestion = QuestionnaireQuestion::findOrFail($id);
        $questionnaireQuestion->update($request->all());

        return $questionnaireQuestion;
    }

    public function destroy($id)
    {
        $questionnaireQuestion = QuestionnaireQuestion::findOrFail($id);
        $questionnaireQuestion->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }
}
