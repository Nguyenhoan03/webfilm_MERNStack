<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdultContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            AdultCategorySeeder::class,
            AdultFilmTagSeeder::class,
        ]);
    }
}
