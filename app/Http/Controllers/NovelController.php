<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Detail;
use App\Models\Follow;
use App\Models\Novel;
use App\Models\NovelCate;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\Vol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NovelController extends Controller
{
	public function NovelIndex()
	{
		// Lấy categories
		$categories = Categories::all();
		return Inertia::render('Client/Novel/Novel', [
			'categories' => $categories,
		]);
	}

	// Thêm truyện
	public function NovelCreate(Request $request)
	{
		// Validate
		$request->validate([
			'name_novel' => ['required', 'string', 'max:255'],
			'thumbnail' => ['image', 'mimes:png,jpg', 'max:3000'],
			'author' => ['required', 'string', 'max:255'],
			'illustrator' => ['required', 'string', 'max:255'],
			'categories' => ['required'],
			'summary' => ['required'],
		], [
			'name_novel.required' => 'Tên truyện không được để trống',
			'name_novel.string' => 'Tên truyện phải là chuỗi',
			'name_novel.max' => 'Tên truyện không được quá 255 ký tự',
			'thumbnail.image' => 'Ảnh không đúng định dạng',
			'thumbnail.mimes' => 'Ảnh phải là định dạng png, jpg',
			'thumbnail.max' => 'Ảnh không được quá 3MB',
			'author.required' => 'Tác giả không được để trống',
			'author.string' => 'Tác giả phải là chuỗi',
			'author.max' => 'Tác giả không được quá 255 ký tự',
			'illustrator.required' => 'Họa sĩ không được để trống',
			'illustrator.string' => 'Họa sĩ phải là chuỗi',
			'illustrator.max' => 'Họa sĩ không được quá 255 ký tự',
			'categories.required' => 'Thể loại không được để trống',
			'summary.required' => 'Tóm tắt không được để trống',
		]);
		// ID team
		$id_team = TeamUser::where('id_user', auth()->user()->id)->first()->id_team;
		// Thêm dữ liệu bảng detail
		$detail = Detail::create([
			'summary' => $request->summary,
			'note' => $request->note,
		]);
		// Upload ảnh
		$path = Storage::disk('digitalocean')->put('novel', $request->file('thumbnail'), 'public');
		// Thêm truyện
		$novel = Novel::create([
			'name_novel' => $request->name_novel,
			'thumbnail' => 'https://flightnovel.sgp1.digitaloceanspaces.com/' . $path,
			'author' => $request->author,
			'illustrator' => $request->illustrator,
			'id_team' => $id_team,
			'id_detail' => $detail->id,
			'id_user' => auth()->user()->id,
		]);

		// Thêm truyện vào bảng novel_cate
		$categoryIds = explode(',', $request->categories);
		foreach ($categoryIds as $cateId) {
			NovelCate::create([
				'id_novel' => $novel->id,
				'id_categories' => $cateId,
			]);
		}

		return redirect()->route('team.index')->with('success', 'Thêm truyện thành công');
	}

	// Admin Novel
	public function NovelAdmin()
	{
		return Inertia::render('Admin/Novel/Novel');
	}

	// Novel User Read
	public function NovelRead($id)
	{
		$status = ['success' => session('success'), 'error' => session('error')];
		$novel = Novel::where('id', $id)->first();
		$vol = Vol::where('id_novel', $id)->with('chap:id,id_vol,title,created_at')->get();
		$follow = Follow::where('id_user', auth()->user()->id)->where('id_novel', $id)->first();
		$follow_count = Follow::where('id_novel', $id)->count();
		return Inertia::render('Client/Novel/NovelRead', [
			'novel' => $novel,
			'vol' => $vol,
			'follow' => [
				'status' => $follow,
				'count' => $follow_count,
			],
			'status' => $status
		]);
	}

	// Novel Follow
	public function NovelFollow($id)
	{
		// Lấy id user
		$id_user = auth()->user()->id;
		$follow_store = Follow::create([
			'id_user' => $id_user,
			'id_novel' => $id,
		]);

		return redirect()->back()->with('success', 'Theo dõi truyện thành công');
	}

	// Novel UnFollow
	public function NovelUnFollow($id)
	{
		// Lấy id user
		$id_user = auth()->user()->id;
		$follow_delete = Follow::where('id_user', $id_user)->where('id_novel', $id)->delete();

		return redirect()->back()->with('success', 'Bỏ theo dõi truyện thành công');
	}
}