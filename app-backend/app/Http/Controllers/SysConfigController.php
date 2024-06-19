<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\SysConfigResource;
use App\Models\SysConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SysConfigController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, SysConfig::class);

        return $data->returnCollectionAsJsonResponse(SysConfigResource::collection($data->collection('sys_configs')));
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'tag' => 'required|string|max:255',
            'value' => 'required|string',
            'description' => 'required|string', 
            'input_type' => 'required',
            'input_rules' => 'nullable',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $sysConfig = SysConfig::create([
            'tag' => $request->tag,
            'value' => $request->value,
            'description' => $request->description,
            'input_type' => $request->input_type,
            'input_rules' => $request->input_rules,
        ]);

        return response()->json([
            'id' => $sysConfig->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    public function show($id)
    {
        $sysConfig = SysConfig::findOrFail($id);

        return new SysConfigResource($sysConfig);
    }

    public function update(Request $request, $id)
    {
        $sysConfig = SysConfig::findOrFail($id);
        $sysConfig->update($request->all());

        return $sysConfig;
    }

    public function destroy(Request $request, $id)
    {
        $sysConfig = SysConfig::findOrFail($id);
        $sysConfig->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
