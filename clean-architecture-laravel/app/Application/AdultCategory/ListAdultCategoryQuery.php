<?php

declare(strict_types=1);

namespace App\Application\AdultCategory;

use App\Application\Query;
use App\Application\Command;

class ListAdultCategoryQuery implements Query
{
    public function __construct(
        private int $page = 1,
        private int $perPage = 15,
        private bool $activeOnly = false
    ) {
        if ($page < 1) {
            throw new \InvalidArgumentException('Page must be greater than 0');
        }
        
        if ($perPage < 1 || $perPage > 100) {
            throw new \InvalidArgumentException('Per page must be between 1 and 100');
        }
    }

    public function getPage(): int
    {
        return $this->page;
    }

    public function getPerPage(): int
    {
        return $this->perPage;
    }

    public function isActiveOnly(): bool
    {
        return $this->activeOnly;
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            page: (int) ($data['page'] ?? 1),
            perPage: (int) ($data['per_page'] ?? 15),
            activeOnly: (bool) ($data['active_only'] ?? false)
        );
    }
}
