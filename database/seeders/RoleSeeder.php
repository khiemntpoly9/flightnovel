<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('role')->insert([
			[
				'name_role' => 'Administrator',
				'short_role' => 'admin',
			],
			[
				'name_role' => 'User',
				'short_role' => 'user',
			]
		]);
	}
}