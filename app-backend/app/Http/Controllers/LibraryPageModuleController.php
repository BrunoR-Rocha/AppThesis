<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\LibraryPageModuleResource;
use App\Models\LibraryPageModule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LibraryPageModuleController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, LibraryPageModule::class);

        return $data->returnCollectionAsJsonResponse(LibraryPageModuleResource::collection($data->collection('library_page_modules')));
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required',
            'position' => 'required|integer',
            'library_page_id' => 'required|exists:library_pages,id',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $pageModule = LibraryPageModule::create([
            'library_page_id' => $request->library_page_id,
            'title' => $request->title,
            'position' => $request->position,
            'content' => $request->content,
        ]);

        return response()->json([
            'id' => $pageModule->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $pageModule = LibraryPageModule::findOrFail($id);

        return new LibraryPageModuleResource($pageModule);
    }

    public function update(Request $request, $id)
    {
        $pageModule = LibraryPageModule::findOrFail($id);
        
        $pageModule->update($request->all());

        return $pageModule;
    }

    public function destroy($id)
    {
        $pageModule = LibraryPageModule::findOrFail($id);
        
        $pageModule->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
