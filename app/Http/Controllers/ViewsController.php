<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ViewNovel;
use App\Models\Novel;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ViewsController extends Controller
{
	// Khai báo biến
	protected $NovelController;
	// Khởi tạo
	public function __construct(NovelController $NovelController)
	{
		$this->NovelController = $NovelController;
	}
	public function DayView()
	{
		$views = ViewNovel::with('novel')
			->orderByDesc('daily_views')->get();
		return $views;
	}
	public function DayWeek()
	{
		$views = ViewNovel::with('novel')
			->orderByDesc('weekly_views')->get();
		return $views;
	}
	public function DayMonth()
	{
		$views = ViewNovel::with('novel')
			->orderByDesc('monthly_views')->get();
		return $views;
	}
	// Lấy dữ liệu từ bảng view_novel theo novel cột id_team
	public function TeamDayView($id_team, $novel)
	{
		if ($id_team == null) {
			return null;
		}
		// Lấy tất cả view_novel theo novel
		$views = ViewNovel::whereIn('id_novel', $novel->pluck('id')->toArray())->with('novel')
			->orderByDesc('daily_views')->get();
		return $views;
	}
	public function TeamWeekView($id_team, $novel)
	{
		if ($id_team == null) {
			return null;
		}
		// Lấy tất cả view_novel theo novel
		$views = ViewNovel::whereIn('id_novel', $novel->pluck('id')->toArray())->with('novel')
			->orderByDesc('weekly_views')->get();
		return $views;
	}
	public function TeamMonthView($id_team, $novel)
	{
		if ($id_team == null) {
			return null;
		}
		// Lấy tất cả view_novel theo novel
		$views = ViewNovel::whereIn('id_novel', $novel->pluck('id')->toArray())->with('novel')
			->orderByDesc('monthly_views')->get();
		return $views;
	}
}
