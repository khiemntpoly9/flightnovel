<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ViewNovel;
use App\Models\Novel;

class ViewsController extends Controller
{

	public function DayView()
	{
		$views = ViewNovel::with('novel')
			->orderByDesc('daily_views')->limit(5)->get();
		return $views;
	}
	public function DayWeek()
	{
		$views = ViewNovel::with('novel')
			->orderByDesc('weekly_views')->limit(5)->get();
		return $views;
	}
	public function DayMonth()
	{
		$views = ViewNovel::with('novel')
			->orderByDesc('monthly_views')->limit(5)->get();
		return $views;
	}
}
