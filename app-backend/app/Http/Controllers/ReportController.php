<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Report::class);

        return $data->returnCollectionAsJsonResponse(ReportResource::collection($data->collection('reports')));
    }
    
    public function show($id)
    {
        $report = Report::findOrFail($id);

        return new ReportResource($report);
    }

    public function destroy($id)
    {
        $report = Report::findOrFail($id);

        $report->delete();

        return response()->json([
            'error' => 'successfully_deleted',
            'message' => __('errors.successfully_deleted'),
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'anonymous'   => 'required|in:yes,no',
            'subject'     => 'required|string',
            'date'        => 'required|date',
            'description' => 'required|string',
        ];

        if ($request->anonymous === 'no') {
            $rules['name']  = 'required|string|max:255';
            $rules['email'] = 'required|email|max:255';
            $rules['phone'] = 'required|digits:9';
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validatedData = $validator->validated();

        $isAnonymous = $validatedData['anonymous'] === 'yes';

        $report = Report::create([
            'anonymous'   => $isAnonymous,
            'name'        => $isAnonymous ? null : $validatedData['name'],
            'email'       => $isAnonymous ? null : $validatedData['email'],
            'phone'       => $isAnonymous ? null : $validatedData['phone'],
            'subject'     => $validatedData['subject'],
            'report_date' => $validatedData['date'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Report created successfully.',
            'report'  => $report,
        ], 201);
    }
}
