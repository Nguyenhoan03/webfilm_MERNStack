<?php

declare(strict_types=1);

namespace App\Application\AdultCategory;

use App\Domain\AdultCategory\AdultCategory;

class ListAdultCategoryResponse
{
    public function __construct(
        private array $categories,
        private int $total,
        private int $page,
        private int $perPage,
        private int $lastPage
    ) {
    }

    public function getCategories(): array
    {
        return $this->categories;
    }

    public function getTotal(): int
    {
        return $this->total;
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }

    public function getLastPage(): int
    {
        return $this->lastPage;
    }

    public function toArray(): array
    {
        return [
            'data' => array_map(
                fn(AdultCategory $category) => $category->toArray(),
                $this->categories
            ),
            'pagination' => [
                'total' => $this->total,
                'page' => $this->page,
                'per_page' => $this->perPage,
                'last_page' => $this->lastPage,
            ]
        ];
    }
}
