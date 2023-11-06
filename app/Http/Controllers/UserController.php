<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Follow;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
	// Lấy tất cả user
	public function getAllUser()
	{
		$users = User::with('role')->get();
		return $users;
	}
	// Lấy tất cả users trong follow
	public function getAllUserFollow($id)
	{
		$users_follow = Follow::where('id_novel', $id)->get();
		return $users_follow;
	}
	// Hiển thị trang quản lý user
	public function UserIndex()
	{
		return Inertia::render('Admin/User/ManagerUser', [
			'users' => $this->getAllUser(),
		]);
	}
	// Hiển thị trang thêm user
	public function UserDelete(Request $request, $id)
	{
		$user = User::find($id);
		$user->delete();
		$request->session()->flash('success', 'Xóa tài khoản thành công');
		return redirect()->route('admin.user');
	}
}
