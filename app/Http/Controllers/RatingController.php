<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
	// Thêm rating
	public function RatingCreate(Request $request)
	{
		// Validate
		$request->validate([
			"id_novel" => ['required', 'integer'],
			'point' => ['required', 'integer'],
		], [
			'id_novel.required' => 'Truyện không được để trống',
			'id_novel.integer' => 'Truyện phải là số nguyên',
			'point.required' => 'Đánh giá không được để trống',
			'point.integer' => 'Đánh giá phải là số nguyên',
		]);
		// Thêm dữ liệu bảng rating
		$rating = Rating::create([
			'id_novel' => $request->id_novel,
			'id_user' => auth()->user()->id,
			'rating' => $request->point,
		]);
		// Trả về dữ liệu
		return redirect()->back();
	}
}
