<?php

namespace App\Http\Controllers;

use App\Models\Chap;
use App\Models\Vol;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class VolController extends Controller
{
	// Lấy tất cả vol theo id_novel
	public function VolGetAll($id_novel)
	{
		$vols = Vol::where('id_novel', $id_novel)->get();
		return $vols;
	}
	public function VolIndex(Request $request)
	{
		$novel = $request->get('novel');
		return Inertia::render('Client/Vol/Vol', [
			'novel_slug' => $novel->slug,
		]);
	}
	// Tạo vol
	public function VolStore(Request $request)
	{
		// Validate
		$request->validate([
			'title' => ['required', 'string', 'min:5', 'max:255'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.min' => 'Tên vol phải có ít nhất 5 ký tự',
			'title.max' => 'Tên vol không được quá 255 ký tự',
		]);
		// Lấy dữ liệu novel từ middleware
		$novel = $request->get('novel');
		// Tạo vol
		$vol = Vol::create([
			'id_novel' => $novel->id,
			'title' => $request->title,
		]);
		// Cập nhật slug
		$volID = $vol->id;
		$newSlug = $volID . '-' . Str::of($request->title)->slug('-');
		$vol->slug = $newSlug;
		$vol->save();

		return redirect()->route('team.novel', ['novel' => $novel->slug])->with('success', 'Tạo chương thành công');
	}
	// Page Update Vol
	public function VolUpdatePage(Request $request, $novel, $vol)
	{
		$vol = Vol::where('slug', $vol)->first();
		return Inertia::render('Client/Vol/VolUpdate', [
			'novel' => $novel,
			'vol' => $vol
		]);
	}
	// Update Vol
	public function VolUpdate(Request $request, $novel, Vol $vol)
	{
		// Validate
		$request->validate([
			'title' => ['required', 'string', 'min:5', 'max:255'],
		], [
			'title.required' => 'Vui lòng nhập tên chương',
			'title.min' => 'Tên chương phải có ít nhất 5 ký tự',
			'title.max' => 'Tên chương không được quá 255 ký tự',
		]);

		// Lưu dữ liệu vào bảng vol
		Vol::where('slug', $vol->slug)->update([
			'title' => $request->title,
			'slug' => $vol->id . '-' . Str::of($request->title)->slug('-')
		]);

		return redirect()->route('team.novel', ['novel' => $novel])->with('success', 'Cập nhật chương thành công');
	}
	// Xoá Vol
	public function VolDelete(Request $request, $novel, $vol)
	{
		// Lấy id vol
		$volA = Vol::where('slug', $vol)->first();
		// Xoá các chap trước khi xoá vol
		$chap = Chap::where('id_vol', $volA->id)->get();
		if ($chap) {
			foreach ($chap as $item) {
				$item->delete();
			}
		}
		// Xoá vol
		$volA->delete();
		return redirect()->route('team.novel', ['novel' => $novel])->with('success', 'Xoá chương thành công');
	}
}