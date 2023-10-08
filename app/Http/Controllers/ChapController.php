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

	public function ChapStore(Request $request, $id, $id_vol)
	{
		$request->validate([
			'title' => ['required', 'string', 'max:255'],
			'content' => ['required'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.max' => 'Tên chương không được quá 255 ký tự',
		]);

		$chap = new Chap();
		$chap->id_vol = $id_vol;
		$chap->title = $request->title;
		$chap->content = $request->content;
		$chap->save();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Tạo chương thành công');
	}
}