<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionnaireSubmissionResource;
use App\Models\QuestionnaireSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionnaireSubmissionController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, QuestionnaireSubmission::class);

        return $data->returnCollectionAsJsonResponse(QuestionnaireSubmissionResource::collection($data->collection('questionnaires_submissions')));
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'questionnaire_id' => 'required|integer|exists:questionnaires,id',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionnaireSubmission = QuestionnaireSubmission::create([
            'questionnaire_id' => $request->questionnaire_id,
            'user_id' => $request->user()->id,
            'submited_at' => now(),
        ]);

        return response()->json([
            'id' => $questionnaireSubmission->id,
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $questionnaireSubmission = QuestionnaireSubmission::findOrFail($id);

        return new QuestionnaireSubmissionResource($questionnaireSubmission);
    }

    public function update(Request $request, $id)
    {
        $questionnaireSubmission = QuestionnaireSubmission::findOrFail($id);
        $questionnaireSubmission->update($request->all());

        return $questionnaireSubmission;
    }
}
