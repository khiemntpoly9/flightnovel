<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HistoryRead;
use Illuminate\Http\Request;

class HistoryReadController extends Controller
{
	// Tạo lịch sử đọc
	public function HistoryReadCreate($id_user, $novel, $chap)
	{
		// Kiểm tra lịch sử đọc
		$historyRead = HistoryRead::where('id_user', $id_user)->where('id_novel', $novel)->first();
		if ($historyRead) {
			// Cập nhật lịch sử đọc
			$historyRead->id_chap = $chap;
			$historyRead->save();
		} else {
			// Tạo lịch sử đọc
			$historyRead = HistoryRead::create([
				'id_user' => $id_user,
				'id_novel' => $novel,
				'id_chap' => $chap,
			]);
		}
		return $historyRead;
	}
}
