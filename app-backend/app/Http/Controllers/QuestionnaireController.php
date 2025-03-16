<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionnaireResource;
use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuestionnaireController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Questionnaire::class);

        return $data->returnCollectionAsJsonResponse(QuestionnaireResource::collection($data->collection('questionnaires')));
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'enabled' => 'required|boolean',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $questionnaire = Questionnaire::create([
            'title' => $request->title,
            'description' => $request->description,
            'enabled' => $request->enabled,
        ]);

        return response()->json([
            'id' => $questionnaire->id,
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $questionnaire = Questionnaire::findOrFail($id);

        return new QuestionnaireResource($questionnaire);
    }

    public function update(Request $request, $id)
    {
        $questionnaire = Questionnaire::findOrFail($id);
        $questionnaire->update($request->all());

        return $questionnaire;
    }

}
