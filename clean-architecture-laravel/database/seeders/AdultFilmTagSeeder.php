<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdultFilmTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Không che',
                'slug' => 'khong-che',
                'color' => '#FF6B6B',
                'is_trending' => true,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vietsub',
                'slug' => 'vietsub',
                'color' => '#4ECDC4',
                'is_trending' => true,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'HD',
                'slug' => 'hd',
                'color' => '#45B7D1',
                'is_trending' => false,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '4K',
                'slug' => '4k',
                'color' => '#96CEB4',
                'is_trending' => true,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mới nhất',
                'slug' => 'moi-nhat',
                'color' => '#FFEAA7',
                'is_trending' => true,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Hot',
                'slug' => 'hot',
                'color' => '#DDA0DD',
                'is_trending' => true,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'JAV',
                'slug' => 'jav',
                'color' => '#98D8C8',
                'is_trending' => false,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Học sinh',
                'slug' => 'hoc-sinh',
                'color' => '#F7DC6F',
                'is_trending' => false,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vụng trộm',
                'slug' => 'vung-trom',
                'color' => '#FFB6C1',
                'is_trending' => false,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ngoại tình',
                'slug' => 'ngoai-tinh',
                'color' => '#DDA0DD',
                'is_trending' => false,
                'usage_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('adult_film_tags')->insert($tags);
    }
}
