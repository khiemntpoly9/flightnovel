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
			'search' => ['nullable', 'string', 'max:255'],

		], [

			'search.string' => 'Tên truyện phải là chuỗi',
			'search.max' => 'Tên truyện không được quá 255 ký tự',
		]);

		$search = $request->search;

		$novel = Novel::where('is_publish', 1)
			->where(function ($query) use ($search) {
				$query->where('name_novel', 'like', "%{$search}%")
					->orWhere('author', 'like', "%{$search}%")
					->orWhere('illustrator', 'like', "%{$search}%");
			})
			->orderBy('created_at', 'desc')
			->get();

		return Inertia::render('Client/Search/Search', [
			'categories' => $this->GetCategories(),
			'novel' => $novel,
		]);
	}

	public function SearchSelectbox(Request $request)
	{
	}

}
