<?php

declare(strict_types=1);

namespace App\Presenter\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AdultCategoryCollection extends ResourceCollection
{
    public function toArray($request): array
    {
        return [
            'data' => $this->collection,
            'pagination' => [
                'total' => $this->total(),
                'page' => $this->currentPage(),
                'per_page' => $this->perPage(),
                'last_page' => $this->lastPage(),
            ]
        ];
    }
}
