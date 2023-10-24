<?php

namespace App\Http\Controllers;


use App\Models\Categories;
use App\Models\Novel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
	//search
	public function Search()
	{
		$categories = Categories::all();
		return Inertia::render('Client/Search/Search', [
			'categories' => $categories,
		]);
	}

	public function SearchAll(Request $request)
	{
		// Validate
		$request->validate([
			'name_novel' => ['required', 'string', 'max:255'],
		], [
			'name_novel.required' => 'Tên truyện không được để trống',
			'name_novel.string' => 'Tên truyện phải là chuỗi',
			'name_novel.max' => 'Tên truyện không được quá 255 ký tự',
		]);
		$novel = Novel::search('xuan')->get();
		dd($novel);
	}
}
