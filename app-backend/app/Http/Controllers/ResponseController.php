<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ResponseResource;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Response::class);

        return $data->returnCollectionAsJsonResponse(ResponseResource::collection($data->collection('responses')));
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
            'quiz_id' => 'required|string',
            'question_id' => 'required|exists:question_topics,id',
            'user_id' => 'nullable|integer',
            'question_title' => 'nullable|string',
            'response_text' => 'nullable|string',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $response = Response::create([
            'quiz_id' => $request->quiz_id,
            'question_id' => $request->question_id,
            'user_id' => Auth::user()->id,
            'question_title' => $request->question_title,
            'response_text' => $request->response_text,
        ]);

        return response()->json([
            'id' => $response->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $response = Response::findOrFail($id);

        return new ResponseResource($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $response = Response::findOrFail($id);

        $response->update($request->all());

        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Response  $response
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $response = Response::findOrFail($id);

        $response->delete();


    }
}
