<?php

namespace App\Http\Controllers;

use App\Models\Chap;
use App\Models\Vol;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VolController extends Controller
{
	public function VolIndex(Request $request, $id)
	{
		return Inertia::render('Client/Vol/Vol', [
			'id_novel' => $id,
		]);
	}

	// Tạo vol
	public function VolStore(Request $request, $id)
	{
		// Validate
		$request->validate([
			'title' => ['required', 'string', 'min:5', 'max:255'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.min' => 'Tên vol phải có ít nhất 5 ký tự',
			'title.max' => 'Tên vol không được quá 255 ký tự',
		]);

		$vol = new Vol();
		$vol->title = $request->title;
		$vol->id_novel = $id;
		$vol->save();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Tạo chương thành công');
	}

	// Page Update Vol
	public function VolUpdatePage(Request $request, $id, $id_vol)
	{
		$vol = Vol::where('id', $id_vol)->first();
		return Inertia::render('Client/Vol/VolUpdate', [
			'novel' => $id,
			'vol' => $vol
		]);
	}

	// Update Vol
	public function VolUpdate(Request $request, $id, $id_vol)
	{
		// Validate
		$request->validate([
			'title' => ['required', 'string', 'min:5', 'max:255'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.min' => 'Tên chương phải có ít nhất 5 ký tự',
			'title.max' => 'Tên chương không được quá 255 ký tự',
		]);

		$vol = Vol::where('id', $id_vol)->first();
		$vol->title = $request->title;
		$vol->save();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Cập nhật chương thành công');
	}

	// Xoá Vol
	public function VolDelete(Request $request, $id, $id_vol)
	{

		// Xoá các chap trước khi xoá vol
		$chap = Chap::where('id_vol', $id_vol)->get();
		foreach ($chap as $item) {
			$item->delete();
		}
		// Xoá vol
		$vol = Vol::where('id', $id_vol)->first();
		$vol->delete();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Xoá chương thành công');
	}
}