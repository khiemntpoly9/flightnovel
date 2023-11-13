<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
	// Khai báo biến
	protected $HistoryReadController;
	protected $NovelController;
	// Khởi tạo
	public function __construct(HistoryReadController $HistoryReadController, NovelController $NovelController)
	{
		$this->HistoryReadController = $HistoryReadController;
		$this->NovelController = $NovelController;
	}
	public function HomeIndex()
	{
		// Check Login
		if (auth()->check()) {
			// Lấy lịch sử đọc
			$historyReadList = $this->HistoryReadController->HistoryReadList(auth()->user()->id);
		}
		return Inertia::render('Client/Home', [
			'novels' => $this->NovelController->NovelGetAllPublic(),
			'novelsNewChap' => $this->NovelController->NovelGetChapNew(),
			'historyReadList' => $historyReadList ?? null,
			'canLogin' => Route::has('login'),
			'canRegister' => Route::has('register'),
		]);
	}
}
