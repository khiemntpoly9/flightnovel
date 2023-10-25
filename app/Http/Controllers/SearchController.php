<?php

namespace App\Http\Controllers;


use App\Models\Categories;
use App\Models\Novel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
	// Get categories
	public function GetCategories()
	{
		$categories = Categories::all();
		return $categories;
	}
	// Search
	public function Search()
	{
		return Inertia::render('Client/Search/Search', [
			'categories' => $this->GetCategories(),
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
		$novel = Novel::search($request->name_novel)->where('is_publish', 1)->get();
		return Inertia::render('Client/Search/Search', [
			'categories' => $this->GetCategories(),
			'novel' => $novel,
		]);
	}
}
