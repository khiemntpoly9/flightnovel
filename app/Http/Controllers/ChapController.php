<?php

namespace App\Http\Controllers;

use App\Models\Chap;
use App\Models\Vol;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ChapController extends Controller
{
	// Khai báo biến
	protected $NovelController;
	protected $HistoryReadController;
	// Khởi tạo
	public function __construct(NovelController $NovelController, HistoryReadController $HistoryReadController)
	{
		$this->NovelController = $NovelController;
		$this->HistoryReadController = $HistoryReadController;
	}
	// Tạo chap
	public function ChapCreate(Request $request, $novel, $vol)
	{
		return Inertia::render('Client/Team/TeamChap', [
			'novel' => $novel,
			'vol' => $vol,
		]);
	}

	// Tạo chap
	public function ChapStore(Request $request, $novel, Vol $vol)
	{
		$request->validate([
			'title' => ['required', 'string', 'min:5', 'max:255'],
			'content' => ['required'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.min' => 'Tên chương phải có ít nhất 5 ký tự',
			'title.max' => 'Tên chương không được quá 255 ký tự',
			'content.required' => 'Vui lòng nhập nội dung chương',
		]);

		$chap = Chap::create([
			'id_vol' => $vol->id,
			'title' => $request->title,
			'content' => $request->content,
		]);

		// Cập nhật slug
		$chapID = $chap->id;
		$newSlug = $chapID . '-' . Str::of($request->title)->slug('-');
		$chap->slug = $newSlug;
		$chap->save();

		return redirect()->route('team.novel', ['novel' => $novel])->with('success', 'Tạo chương thành công');
	}

	// Cập nhật chap
	public function ChapUpdate(Request $request, $novel, $vol, Chap $chap)
	{
		$list = ['novel' => $novel, 'vol' => $vol];
		$chap = Chap::where('slug', $chap->slug)->first();
		return Inertia::render('Client/Novel/ChapUpdate', [
			'chap' => $chap,
			'list' => $list
		]);
	}

	// Lưu cập nhật chap
	public function ChapUpdatePatch(Request $request, $novel, $vol, Chap $chap)
	{
		$request->validate([
			'title' => ['required', 'string', 'min:5', 'max:255'],
			'content' => ['required'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.min' => 'Tên chương phải có ít nhất 5 ký tự',
			'title.max' => 'Tên chương không được quá 255 ký tự',
			'content.required' => 'Vui lòng nhập nội dung chương',
		]);

		// Lưu dữ liệu vào bảng chap
		Chap::where('id', $chap->id)->update([
			'title' => $request->title,
			'content' => $request->content,
			'slug' => $chap->id . '-' . Str::of($request->title)->slug('-')
		]);

		return redirect()->route('team.novel', ['novel' => $novel])->with('success', 'Cập nhật chap thành công');
	}

	// Xoá chap
	public function ChapDelete(Request $request, $novel, $vol, Chap $chap)
	{
		$chap = Chap::find($chap->id);
		$chap->delete();
		return redirect()->route('team.novel', ['novel' => $novel])->with('success', 'Xoá chap thành công');
	}

	// Chapter
	public function Chapter(Request $request, $novel, $vol, Chap $chap)
	{
		$vol = Vol::where('slug', $vol)->first();
		$id_user = auth()->user()->id;
		if ($id_user) {
			// Lấy thông tin novel
			$novel = $this->NovelController->NovelGetSlug($novel);
			// Tạo lịch sử đọc
			$this->HistoryReadController->HistoryReadCreate($id_user, $novel->id, $chap->id);
		}
		return Inertia::render('Client/Novel/Chapter', ['vol' => $vol, 'chap' => $chap]);
	}
}