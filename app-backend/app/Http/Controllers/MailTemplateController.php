<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\MailTemplateResource;
use App\Models\MailTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MailTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, MailTemplate::class);

        return $data->returnCollectionAsJsonResponse(MailTemplateResource::collection($data->collection('mail_templates')));
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
            'tag' => 'required|string|max:255',
            'from' => 'nullable|string',
            'description' => 'required|string', 
            'content' => 'required',
            'enabled' => 'required|boolean',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('errors.validator_fail'),
            ], 400);
        }

        $from = isset($request->from) ? $request->from : config('mail.from.address'); 

        $news = MailTemplate::create([
            'tag' => $request->tag,
            'from' => $from,
            'description' => $request->description,
            'content' => $request->content,
            'enabled' => $request->enabled,
        ]);

        return response()->json([
            'id' => $news->id, 
            'message' => __('validator.success'),
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $mailTemplate = MailTemplate::findOrFail($id);

        return new MailTemplateResource($mailTemplate);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $mailTemplate = MailTemplate::findOrFail($id);
        $mailTemplate->update($request->all());

        return $mailTemplate;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Apenas um superAdministrador pode eliminar este tipo de models!

        $mailTemplate = MailTemplate::findOrFail($id);
        $mailTemplate->delete();

        return response()->json([
            'error' => 'successfully_deleted', 'message' => __('errors.successfully_deleted'),
        ]);
    }
}
