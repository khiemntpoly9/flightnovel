<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CateSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('categories')->insert([
			[
				'name' => 'Thể loại 1',
			],
			[
				'name' => 'Thể loại 2',
			],
			[
				'name' => 'Thể loại 3',
			],
			[
				'name' => 'Thể loại 4',
			],
		]);
	}
}