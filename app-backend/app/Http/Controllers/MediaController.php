<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function showImage($filename)
    {
        $path = 'public/images/' . $filename;

        if (!Storage::exists($path)) {
            abort(404);
        }

        $file = Storage::get($path);
        $type = Storage::mimeType($path);

        return response($file, 200)->header('Content-Type', $type);
    }
}
