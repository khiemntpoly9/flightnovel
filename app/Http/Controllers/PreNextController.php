<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Novel;
use App\Models\Vol;
use Illuminate\Http\Request;
use App\Models\Chap;
use Inertia\Inertia;

class PreNextController extends Controller
{
	// Khai báo biến
	protected $NovelController;
	protected $VolController;
	// Khởi tạo
	public function __construct(NovelController $NovelController, VolController $VolController)
	{
		$this->NovelController = $NovelController;
		$this->VolController = $VolController;
	}
	public function Next(Request $request, $novel, $vol, Chap $chap)
	{
		// Lấy danh sách vol theo id novel
		$novel = $this->NovelController->NovelGetSlug($novel);
		$vols = $this->VolController->VolGetAll($novel->id);
		$chap_curr = $chap;
		// Lấy vol, danh sách chap của vol hiện tại
		$currentVol = Vol::where('slug', $vol)->with('chap')->firstOrFail();
		// Tạo 1 mảng id chap theo $currentVol->chap
		$arrChap = [];
		foreach ($currentVol->chap as $chap) {
			array_push($arrChap, $chap->id);
		}
		// Tìm vị trí của giá trị biết trước
		$index = array_search($chap_curr->id, $arrChap);
		if ($index !== false && isset($currentVol->chap[$index + 1])) {
			// Lấy giá trị ngay sau giá trị biết trước
			$nextValue = $currentVol->chap[$index + 1];
		} else {
			// dd('Không có chương tiếp theo');
			$arrVol = [];
			foreach ($vols as $vol_i) {
				array_push($arrVol, $vol_i->id);
			}
			$indexVol = array_search($currentVol->id, $arrVol);
			if ($indexVol !== false && isset($vols[$indexVol + 1])) {
				$nextVol = $vols[$indexVol + 1];
				$nextValue = $nextVol->chap[0];
				return redirect()->route('novel.chapter', ['novel' => $novel->slug, 'vol' => $nextVol->slug, 'chap' => $nextValue->slug]);
			} else {
				return redirect()->route('novel.read', ['novel' => $novel->slug]);
			}
		}
		return redirect()->route('novel.chapter', ['novel' => $novel->slug, 'vol' => $vol, 'chap' => $nextValue->slug]);
	}
	public function Prev(Request $request, $novel, $vol, Chap $chap)
	{
		// Lấy danh sách vol theo id novel
		$novel = $this->NovelController->NovelGetSlug($novel);
		$vols = $this->VolController->VolGetAll($novel->id);
		$chap_curr = $chap;
		// Lấy vol, danh sách chap của vol hiện tại
		$currentVol = Vol::where('slug', $vol)->with('chap')->firstOrFail();
		// Tạo 1 mảng id chap theo $currentVol->chap
		$arrChap = [];
		foreach ($currentVol->chap as $chap) {
			array_push($arrChap, $chap->id);
		}
		// Tìm vị trí của giá trị biết trước
		$index = array_search($chap_curr->id, $arrChap);
		if ($index !== false && isset($currentVol->chap[$index - 1])) {
			// Lấy giá trị ngay sau giá trị biết trước
			$nextValue = $currentVol->chap[$index - 1];
		} else {
			// dd('Không có chương tiếp theo');
			$arrVol = [];
			foreach ($vols as $vol_i) {
				array_push($arrVol, $vol_i->id);
			}
			$indexVol = array_search($currentVol->id, $arrVol);
			if ($indexVol !== false && isset($vols[$indexVol - 1])) {
				$nextVol = $vols[$indexVol - 1];
				$a = $nextVol->chap->toArray();
				$nextValue = end($a);
				return redirect()->route('novel.chapter', ['novel' => $novel->slug, 'vol' => $nextVol->slug, 'chap' => $nextValue['slug']]);
			} else {
				return redirect()->route('novel.read', ['novel' => $novel->slug]);
			}
		}
		return redirect()->route('novel.chapter', ['novel' => $novel->slug, 'vol' => $vol, 'chap' => $nextValue->slug]);
	}
}
