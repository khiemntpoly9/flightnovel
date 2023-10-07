<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\TeamUser;
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
			'title' => ['required', 'string', 'max:255'],
		], [
			'title.required' => 'Vui lòng nhập tên vol',
			'title.max' => 'Tên vol không được quá 255 ký tự',
		]);

		$vol = new Vol();
		$vol->title = $request->title;
		$vol->id_novel = $id;
		$vol->save();

		return redirect()->route('team.novel', ['id' => $id])->with('success', 'Tạo chương thành công');
	}
}