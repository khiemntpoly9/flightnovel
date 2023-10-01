<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Detail;
use App\Models\Novel;
use App\Models\NovelCate;
use App\Models\Team;
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
		]);
		// ID team
		$id_team = Team::where('id_user', auth()->user()->id)->first()->id_team;
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
		]);

		// Thêm truyện vào bảng novel_cate
		$categoryIds = explode(',', $request->categories);
		foreach ($categoryIds as $cateId) {
			NovelCate::create([
				'id_novel' => $novel->id,
				'id_categories' => $cateId,
			]);
		}

		return Inertia::render('Client/Team/Team', [
			'success' => 'Thêm truyện thành công',
		]);
	}
}