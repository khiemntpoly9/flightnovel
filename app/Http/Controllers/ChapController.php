<?php

namespace App\Http\Controllers;

use App\Models\Chap;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapController extends Controller
{
	public function ChapCreate(Request $request, $id, $id_vol)
	{
		return Inertia::render('Client/Team/TeamChap', [
			'id_novel' => $id,
			'id_vol' => $id_vol,
		]);
	}

	// Tạo chap
	public function ChapStore(Request $request, $id, $id_vol)
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

		$chap = new Chap();
		$chap->id_vol = $id_vol;
		$chap->title = $request->title;
		$chap->content = $request->content;
		$chap->save();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Tạo chương thành công');
	}

	// Cập nhật chap
	public function ChapUpdate(Request $request, $id, $id_vol, $id_chap)
	{
		$list = ['id' => $id, 'id_vol' => $id_vol];
		$chap = Chap::where('id', $id_chap)->first();
		return Inertia::render('Client/Novel/ChapUpdate', [
			'chap' => $chap,
			'list' => $list
		]);
	}

	// Lưu cập nhật chap
	public function ChapUpdatePatch(Request $request, $id, $id_vol, $id_chap)
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

		$chap = Chap::find($id_chap);
		$chap->title = $request->title;
		$chap->content = $request->content;
		$chap->save();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Cập nhật chap thành công');
	}

	// Xoá chap
	public function ChapDelete(Request $request, $id, $id_vol, $id_chap)
	{
		$chap = Chap::find($id_chap);
		$chap->delete();
		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Xoá chương thành công');
	}
}