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
		$status = $request->select;
		$categories = $request->categories;
		$query = Novel::where('is_publish', 1)->with('novelcate');

		// check điều kiện status
		if ($status) {
			$query->where('status', $status);
		}

		// check categories
		if ($categories) {
			$query->whereHas('novelcate', function ($query) use ($categories) {
				$query->whereIn('id_categories', $categories);
			});
		}

		// check Tên tác giả ,họa sĩ, tên truyện
		$query->where(function ($query) use ($search) {
			$query->where('name_novel', 'like', "%{$search}%")
				->orWhere('author', 'like', "%{$search}%")
				->orWhere('illustrator', 'like', "%{$search}%");
		});
		$novel = $query->orderBy('created_at', 'desc')->get();

		return Inertia::render('Client/Search/Search', [
			'categories' => $this->GetCategories(),
			'novel' => $novel,
		]);
	}
}
