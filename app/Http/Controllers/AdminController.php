<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Novel;
use App\Models\Team;
use App\Models\User;
use App\Models\ViewNovel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
	// Khai báo biến
	protected $NovelController;
	protected $ViewsController;
	// Khởi tạo
	public function __construct(NovelController $NovelController, ViewsController $ViewsController)
	{
		$this->NovelController = $NovelController;
		$this->ViewsController = $ViewsController;
	}
	public function Dashboard()
	{
		$novel = Novel::all()->count();

		$user = User::all()->count();

		return Inertia::render('Admin/AdminMain', [
			'data' => [$novel, $user],
			'views' => [
				$this->ViewsController->DayView(),
				$this->ViewsController->DayWeek(),
				$this->ViewsController->DayMonth()
			]
		]);
	}
	// Trang chi tiết team | admin (page)
	public function TeamDetailAdmin(Team $team)
	{
		$novel = $this->NovelController->NovelGetIdTeam($team->id);
		return Inertia::render('Admin/Team/TeamDetail', [
			'team' => $team,
			'views' => [
				$this->ViewsController->TeamDayView($team->id, $novel),
				$this->ViewsController->TeamWeekView($team->id, $novel),
				$this->ViewsController->TeamMonthView($team->id, $novel)
			]
		]);
	}
}