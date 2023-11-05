<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
	// Khai báo biến
	protected $HistoryReadController;
	// Khởi tạo
	public function __construct(HistoryReadController $HistoryReadController)
	{
		$this->HistoryReadController = $HistoryReadController;
	}
	public function HomeIndex()
	{
		// Lấy novel
		$novels = Novel::where('is_publish', 1)->orderBy('created_at', 'desc')->get();
		// Check Login
		if (auth()->check()) {
			// Lấy lịch sử đọc
			$historyReadList = $this->HistoryReadController->HistoryReadList(auth()->user()->id);
		}
		return Inertia::render('Client/Home', [
			'novels' => $novels,
			'historyReadList' => $historyReadList ?? null,
			'canLogin' => Route::has('login'),
			'canRegister' => Route::has('register'),
		]);
	}
}
