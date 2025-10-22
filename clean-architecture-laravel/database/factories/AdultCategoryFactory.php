<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Infrastructure\Database\AdultCategory\AdultCategoryModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Infrastructure\Database\AdultCategory\AdultCategoryModel>
 */
class AdultCategoryFactory extends Factory
{
    protected $model = AdultCategoryModel::class;

    public function definition(): array
    {
        $name = $this->faker->words(2, true);
        $slug = Str::slug($name);
        
        return [
            'name' => $name,
            'slug' => $slug,
            'description' => $this->faker->sentence(),
            'icon' => $this->faker->randomElement([
                'action-icon.svg',
                'comedy-icon.svg',
                'drama-icon.svg',
                'horror-icon.svg',
                'romance-icon.svg',
            ]),
            'color' => $this->faker->randomElement([
                '#FF6B6B',
                '#4ECDC4',
                '#45B7D1',
                '#96CEB4',
                '#FFEAA7',
                '#DDA0DD',
                '#98D8C8',
            ]),
            'is_active' => $this->faker->boolean(80), // 80% chance of being active
            'sort_order' => $this->faker->numberBetween(0, 100),
            'film_count' => $this->faker->numberBetween(0, 1000),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
