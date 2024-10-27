<?php

namespace App\Http\Controllers;

use App\Models\LibraryPage;
use App\Models\UserFavorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserFavoriteController extends Controller
{
    private function storeFavorite(Request $request, $modelClass)
    {
        $user = Auth::user();
        $contentId = $request->input('content_id');

        $content = $modelClass::findOrFail($contentId);
        if (!$content) {
            return response()->json(['message' => 'Cannot be saved'], 400);
        }

        $existingFavorite = UserFavorite::where('user_id', $user->id)
            ->where('favoritable_id', $contentId)
            ->where('favoritable_type', $modelClass)
            ->first();

        if ($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(['message' => 'Item removed from favorites.'], 200);
        } else {
            $user->favorites()->create([
                'favoritable_id' => $contentId,
                'favoritable_type' => $modelClass,
            ]);
            return response()->json(['message' => 'Item added to favorites.'], 200);
        }
    }

    public function storeLibraryFavorite(Request $request)
    {
        return $this->storeFavorite($request, LibraryPage::class);
    }

    public function getFavorites()
    {
        $user = Auth::user();
        $favorites = $user->favorites()->with('favoritable')->get();

        return response()->json($favorites);
    }

    public function getFavoritePages()
    {
        $user = Auth::user();
        $favoritePages = $user->favorites()->where('favoritable_type', LibraryPage::class)->with('favoritable')->get();

        return response()->json($favoritePages);
    }
}
