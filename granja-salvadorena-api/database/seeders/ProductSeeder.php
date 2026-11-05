<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::insert([
            [
                'name' => 'Horchata Salvadoreña',
                'description' => 'Bebida tradicional elaborada con semillas de morro, arroz y especias.',
                'price' => 3.50,
                'stock' => 50,
                'country' => 'El Salvador',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Quesillo Salvadoreño',
                'description' => 'Quesillo artesanal tradicional de El Salvador.',
                'price' => 4.00,
                'stock' => 30,
                'country' => 'El Salvador',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}