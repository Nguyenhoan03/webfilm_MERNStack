<?php

declare(strict_types=1);

namespace App\Presenter\Http\Resources;

use App\Domain\AdultCategory\AdultCategory;
use Illuminate\Http\Resources\Json\JsonResource;

class AdultCategoryResource extends JsonResource
{
    public function toArray($request): array
    {
        /** @var AdultCategory $category */
        $category = $this->resource;
        
        return [
            'id' => $category->getId()->value(),
            'name' => $category->getName()->value(),
            'slug' => $category->getSlug()->value(),
            'description' => $category->getDescription()->value(),
            'icon' => $category->getIcon()->value(),
            'color' => $category->getColor()->value(),
            'is_active' => $category->isActive()->value(),
            'sort_order' => $category->getSortOrder()->value(),
            'film_count' => $category->getFilmCount()->value(),
            'created_at' => $category->getCreatedAt()->format('Y-m-d H:i:s'),
            'updated_at' => $category->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}
