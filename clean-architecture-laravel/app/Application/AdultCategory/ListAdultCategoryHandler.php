<?php

declare(strict_types=1);

namespace App\Application\AdultCategory;

use App\Domain\AdultCategory\AdultCategoryRepositoryInterface;

class ListAdultCategoryHandler
{
    public function __construct(
        private AdultCategoryRepositoryInterface $adultCategoryRepository
    ) {
    }

    public function handle(ListAdultCategoryQuery $query): array
    {
        
        if ($query->isActiveOnly()) {
            return $this->adultCategoryRepository->listActiveAdultCategories(
                $query->getPage(),
                $query->getPerPage()
            );
        }

        return $this->adultCategoryRepository->listAdultCategories(
            $query->getPage(),
            $query->getPerPage()
        );
    }
}