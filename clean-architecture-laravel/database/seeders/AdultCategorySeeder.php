<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdultCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Phim sex hay',
                'slug' => 'phim-sex-hay',
                'description' => 'Tuyển tập phim sex hay nhất, chất lượng cao',
                'icon' => 'fas fa-heart',
                'color' => '#FF6B6B',
                'is_active' => true,
                'sort_order' => 1,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phim sex Vietsub',
                'slug' => 'phim-sex-vietsub',
                'description' => 'Phim sex có phụ đề tiếng Việt',
                'icon' => 'fas fa-closed-captioning',
                'color' => '#4ECDC4',
                'is_active' => true,
                'sort_order' => 2,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phim sex không che',
                'slug' => 'phim-sex-khong-che',
                'description' => 'Phim sex không che, rõ nét nhất',
                'icon' => 'fas fa-eye',
                'color' => '#45B7D1',
                'is_active' => true,
                'sort_order' => 3,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sex học sinh',
                'slug' => 'sex-hoc-sinh',
                'description' => 'Phim sex học sinh, sinh viên',
                'icon' => 'fas fa-graduation-cap',
                'color' => '#96CEB4',
                'is_active' => true,
                'sort_order' => 4,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Vụng trộm - Ngoại tình',
                'slug' => 'vung-trom-ngoai-tinh',
                'description' => 'Phim sex vụng trộm, ngoại tình',
                'icon' => 'fas fa-heart-broken',
                'color' => '#FFEAA7',
                'is_active' => true,
                'sort_order' => 5,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phim cấp 3',
                'slug' => 'phim-cap-3',
                'description' => 'Phim cấp 3, phim người lớn',
                'icon' => 'fas fa-star',
                'color' => '#DDA0DD',
                'is_active' => true,
                'sort_order' => 6,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sex Mỹ - Châu Âu',
                'slug' => 'sex-my-chau-au',
                'description' => 'Phim sex Mỹ, Châu Âu chất lượng cao',
                'icon' => 'fas fa-globe',
                'color' => '#98D8C8',
                'is_active' => true,
                'sort_order' => 7,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'JAV - Nhật Bản',
                'slug' => 'jav-nhat-ban',
                'description' => 'Phim JAV, phim sex Nhật Bản',
                'icon' => 'fas fa-flag',
                'color' => '#F7DC6F',
                'is_active' => true,
                'sort_order' => 8,
                'film_count' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('adult_categories')->insert($categories);
    }
}
