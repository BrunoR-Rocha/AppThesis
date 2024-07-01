<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\LibraryPageResource;
use App\Models\LibraryPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LibraryPageController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, LibraryPage::class);

        return $data->returnCollectionAsJsonResponse(LibraryPageResource::collection($data->collection('library_pages')));
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $page = LibraryPage::create([
            'title' => $request->title,
        ]);

        return response()->json([
            'id' => $page->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $page = LibraryPage::findOrFail($id);

        return new LibraryPageResource($page);
    }

    public function update(Request $request, $id)
    {
        $page = LibraryPage::findOrFail($id);
        
        $page->update($request->all());

        return $page;
    }

    public function destroy($id)
    {
        $page = LibraryPage::findOrFail($id);
        
        $page->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
