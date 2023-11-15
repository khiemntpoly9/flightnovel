<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetViewMonth extends Command
{
	protected $signature = 'app:reset-view-month';

	protected $description = 'Command description';

	public function handle()
	{
		// Reset view count for the month
		DB::table('view_novel')->update(['monthly_views' => 0]);
	}
}
