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
		// Kiểm tra rating
		$rating = Rating::where('id_novel', $request->id_novel)->where('id_user', auth()->user()->id)->first();
		if ($rating) {
			// Cập nhật rating
			$rating->rating = $request->point;
			$rating->save();
		} else {
			$rating = Rating::create([
				'id_novel' => $request->id_novel,
				'id_user' => auth()->user()->id,
				'rating' => $request->point,
			]);
		}
		// Trả về dữ liệu
		return redirect()->back();
	}
	// Xóa rating
	public function RatingDelete($id)
	{
		Rating::where('id_novel', $id)->delete();
	}
	// Lấy dữ liệu rating
	public function RatingGet($id)
	{
		$rating = Rating::where('id_novel', $id)->get();
		return $rating;
	}
	// Lấy dữ liệu rating của user theo novel
	public function RatingGetUser($id)
	{
		$rating = Rating::where('id_novel', $id)->where('id_user', auth()->user()->id)->first();
		return $rating;
	}
}
