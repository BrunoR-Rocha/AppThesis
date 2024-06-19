<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Faq::class);
        return $data->returnCollectionAsJsonResponse(FaqResource::collection($data->collection('faqs')));
    }

    public function show($id)
    {
        $faq = Faq::findOrFail($id);
        return new FaqResource($faq);
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'enabled' => 'required|boolean',
            'section' => 'required|string',
        ]);

        // Add validation for section, needs to be in the categories available
        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('auth.register_fail'),
            ], 400);
        }

        $faq = Faq::create([
            'title' => $request->title,
            'body' => $request->body,
            'enabled' => $request->enabled,
            'section' => $request->section,
        ]);

        return response()->json([
            'id' => $faq->id, 
            'message' => __('auth.register'),
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $faq->update($request->all());

        return $faq;
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
