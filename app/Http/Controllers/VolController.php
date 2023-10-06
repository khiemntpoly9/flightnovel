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
		// Kiểm tra novel có tồn tại không
		$novel = Novel::find($id);
		if (!$novel) {
			return redirect()->route('team.index')->with('error', 'Truyện không tồn tại');
		} else {
			$id_team = $novel->id_team;
			$user = TeamUser::where('id_team', $id_team)->where('id_user', auth()->user()->id)->first();
			if ($user) {
				return Inertia::render('Client/Vol/Vol', [
					'id_novel' => $id,
				]);
			} else {
				return redirect()->route('team.index')->with('error', 'Bạn không có quyền cho truyện này');
			}
		}
	}

	// Tạo vol
	public function VolStore(Request $request, $id)
	{
		// Kiểm tra novel có tồn tại không
		$novel = Novel::find($id);
		if (!$novel) {
			return redirect()->route('team.index')->with('error', 'Truyện không tồn tại');
		} else {
			$id_team = $novel->id_team;
			$user = TeamUser::where('id_team', $id_team)->where('id_user', auth()->user()->id)->first();
			if (!$user) {
				return redirect()->route('team.index')->with('error', 'Bạn không có quyền cho truyện này');
			}
		}
		// Validate
		$request->validate([
			'title' => ['required', 'string', 'max:255'],
		], [
			'title.required' => 'Vui lòng nhập tên vol',
			'title.max' => 'Tên vol không được quá 255 ký tự',
		]);

		// $vol = new Vol();
		// $vol->title = $request->title;
		// $vol->id_novel = $id;
		// $vol->save();

		return redirect()->back()->with('success', 'Tạo vol thành công');
	}
}