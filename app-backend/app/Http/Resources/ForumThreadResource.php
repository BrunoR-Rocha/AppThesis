<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ForumThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'forum_category_id' => $this->forum_category_id,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'category' => $this->forumCategory,
            'author' => $this->user->name,
            'data' => Carbon::parse($this->created_at)->format('d/m/Y'),
            'posts_count' => $this->forumPosts()->count(),
            'likes_count' => $this->likes()->count(),
            'is_liked_by_user' => $request->user() ? $this->isLikedBy($request->user()) : null,
        ];
    }
}
