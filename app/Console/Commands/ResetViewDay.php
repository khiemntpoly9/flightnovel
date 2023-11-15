<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetViewDay extends Command
{
	protected $signature = 'app:reset-view-day';

	protected $description = 'Command description';

	public function handle()
	{
		// Reset view count for the day
		DB::table('view_novel')->update(['daily_views' => 0]);
	}
}
