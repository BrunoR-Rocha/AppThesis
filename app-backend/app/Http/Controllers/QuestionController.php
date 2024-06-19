<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\QuestionShowResource;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request )
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
        $question = Question::findOrFail($id);

        $question->update($request->all());

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

        $question->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
