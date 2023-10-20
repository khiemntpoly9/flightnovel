<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
	// Thêm comment
	public function CommentCreate(Request $request)
	{
		// Validate
		$request->validate([
			'content' => ['required', 'string', 'max:255'],
		], [
			'content.required' => 'Nội dung không được để trống',
			'content.string' => 'Nội dung phải là chuỗi',
			'content.max' => 'Nội dung không được quá 255 ký tự',
		]);
		// Thêm dữ liệu bảng comment
		$comment = Comment::create([
			'id_novel' => $request->id_novel,
			'id_user' => auth()->user()->id,
			'content' => $request->content,
			'parent_id' => $request->parent_id,
		]);
		// Trả về dữ liệu
		return redirect()->back();
	}

	// Xóa comment
	public function NovelCommentDelete($id)
	{
		// Xóa dữ liệu bảng comment
		Comment::where('id', $id)->delete();
		// Xóa dữ liệu bảng comment con
		Comment::where('parent_id', $id)->delete();
		// Trả về dữ liệu
		return redirect()->back();
	}
}