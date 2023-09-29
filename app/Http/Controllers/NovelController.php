<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
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
		dd($request->all());
		// return Inertia::render('Client/Novel/NovelCreate');
	}
}