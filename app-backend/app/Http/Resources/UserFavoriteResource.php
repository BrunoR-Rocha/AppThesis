<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserFavoriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $page = $this->favoritable;

        return [
            'id' => $page->id,
            'title' => $page->title,
            'description' => $page->description,
            'author' => $page->author,
            'date' => $page->date,
            'tag' => $page->tag,
            'is_favorite' => true, // Since this is a favorite resource, we set this to true
        ];
    }
}
