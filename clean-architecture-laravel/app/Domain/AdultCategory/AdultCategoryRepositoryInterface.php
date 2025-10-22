<?php

declare(strict_types=1);

namespace App\Domain\AdultCategory;

interface AdultCategoryRepositoryInterface
{
    /**
     * Get all adult categories with pagination
     */
    public function listAdultCategories(int $page = 1, int $perPage = 15): array;

    /**
     * Get adult category by ID
     */
    public function findById(int $id): ?AdultCategory;

    /**
     * Get adult category by slug
     */
    public function findBySlug(string $slug): ?AdultCategory;

    /**
     * Get active adult categories only
     */
    public function listActiveAdultCategories(int $page = 1, int $perPage = 15): array;

    /**
     * Get total count of adult categories
     */
    public function countAdultCategories(): int;

    /**
     * Get total count of active adult categories
     */
    public function countActiveAdultCategories(): int;
}
