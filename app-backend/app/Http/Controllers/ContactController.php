<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = new ApiResponse($request, Contact::class);

        return $data->returnCollectionAsJsonResponse(ContactResource::collection($data->collection('contacts')));
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
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'archived' => 'required|boolean',
            'email' => 'required|string',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('auth.register_fail'),
            ], 400);
        }

        $contact = Contact::create([
            'name' => $request->name,
            'subject' => $request->subject,
            'email' => $request->email,
            'message' => $request->message,
            'archived' => $request->archived,
        ]);

        return response()->json([
            'id' => $contact->id,
            'message' => __('auth.register'),
        ], 200);
    }

    public function frontStore(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'email' => 'required|email',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'errors' => $validatedData->errors(),
                'message' => __('contact.front.insuccess'),
            ], 400);
        }

        try {
            $data = array_merge($validatedData->validated(), ['archived' => false]);
            
            $contact = new Contact($data);  
            $contact->save();

            return response()->json(['message' => __('contact.front.success')], 200);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => __('contact.front.insuccess')], 400);
        }
    }

    public function contactResponse(Request $request) {}
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contact = Contact::findOrFail($id);

        return new ContactResource($contact);
    }
}
