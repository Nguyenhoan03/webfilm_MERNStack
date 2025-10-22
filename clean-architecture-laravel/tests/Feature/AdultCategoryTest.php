<?php

declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;
use App\Infrastructure\Database\AdultCategory\AdultCategoryModel;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdultCategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_adult_categories_list(): void
    {
        // Create test data
        AdultCategoryModel::factory()->create([
            'name' => 'Action',
            'slug' => 'action',
            'description' => 'Action movies',
            'color' => '#FF6B6B',
            'is_active' => true,
            'sort_order' => 1,
            'film_count' => 10,
        ]);

        AdultCategoryModel::factory()->create([
            'name' => 'Comedy',
            'slug' => 'comedy',
            'description' => 'Comedy movies',
            'color' => '#4ECDC4',
            'is_active' => true,
            'sort_order' => 2,
            'film_count' => 15,
        ]);

        // Test API endpoint
        $response = $this->getJson('/api/adult-categories');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'slug',
                            'description',
                            'icon',
                            'color',
                            'is_active',
                            'sort_order',
                            'film_count',
                            'created_at',
                            'updated_at',
                        ]
                    ],
                    'pagination' => [
                        'total',
                        'page',
                        'per_page',
                        'last_page',
                    ]
                ]
            ]);
    }

    public function test_can_filter_active_categories_only(): void
    {
        // Create test data
        AdultCategoryModel::factory()->create([
            'name' => 'Active Category',
            'slug' => 'active-category',
            'is_active' => true,
        ]);

        AdultCategoryModel::factory()->create([
            'name' => 'Inactive Category',
            'slug' => 'inactive-category',
            'is_active' => false,
        ]);

        // Test with active_only=true
        $response = $this->getJson('/api/adult-categories?active_only=true');

        $response->assertStatus(200);
        
        $data = $response->json('data.data');
        $this->assertCount(1, $data);
        $this->assertEquals('Active Category', $data[0]['name']);
    }

    public function test_pagination_works_correctly(): void
    {
        // Create 25 test categories
        AdultCategoryModel::factory()->count(25)->create();

        // Test first page
        $response = $this->getJson('/api/adult-categories?page=1&per_page=10');
        
        $response->assertStatus(200);
        
        $data = $response->json('data');
        $this->assertCount(10, $data['data']);
        $this->assertEquals(1, $data['pagination']['page']);
        $this->assertEquals(10, $data['pagination']['per_page']);
        $this->assertEquals(25, $data['pagination']['total']);
        $this->assertEquals(3, $data['pagination']['last_page']);
    }

    public function test_validation_errors(): void
    {
        // Test invalid page
        $response = $this->getJson('/api/adult-categories?page=0');
        $response->assertStatus(422);

        // Test invalid per_page
        $response = $this->getJson('/api/adult-categories?per_page=101');
        $response->assertStatus(422);

        // Test invalid active_only
        $response = $this->getJson('/api/adult-categories?active_only=invalid');
        $response->assertStatus(422);
    }
}
