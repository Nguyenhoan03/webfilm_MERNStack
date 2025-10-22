<?php

declare(strict_types=1);

namespace App\Application\AdultCategory;

use App\Application\CommandHandler;
use App\Application\Command;
use App\Domain\AdultCategory\AdultCategoryRepositoryInterface;

class ListAdultCategoryHandler implements CommandHandler
{
    public function __construct(
        private AdultCategoryRepositoryInterface $adultCategoryRepository
    ) {
    }

    public function handle(Command $command): array
    {
        if (!($command instanceof ListAdultCategoryQuery)) {
            throw new \InvalidArgumentException('Command must be an instance of ListAdultCategoryQuery');
        }

        $query = $command;
        
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