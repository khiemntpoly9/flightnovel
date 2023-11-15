<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\DB;
use Illuminate\Console\Command;

class ResetViewWeek extends Command
{
	protected $signature = 'app:reset-view-week';

	protected $description = 'Command description';

	public function handle()
	{
		// Reset view count for the week
		DB::table('view_novel')->update(['weekly_views' => 0]);
	}
}
