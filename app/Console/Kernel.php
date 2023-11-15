<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
	/**
	 * Define the application's command schedule.
	 */
	protected function schedule(Schedule $schedule): void
	{
		// Reset view count for the day
		$schedule->command('app:reset-view-day')->dailyAt('00:00');
		// Reset view count for the week
		$schedule->command('app:reset-view-week')->weeklyOn(1, '00:00');
		// Reset view count for the month
		$schedule->command('app:reset-view-month')->monthlyOn(1, '00:00');
	}

	/**
	 * Register the commands for the application.
	 */
	protected function commands(): void
	{
		$this->load(__DIR__ . '/Commands');

		require base_path('routes/console.php');
	}
}
