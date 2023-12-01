<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Follow;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
	// Khai báo biến
	protected $HistoryReadController;
	protected $TeamController;
	// Khởi tạo
	public function __construct(HistoryReadController $HistoryReadController, TeamController $TeamController)
	{
		$this->HistoryReadController = $HistoryReadController;
		$this->TeamController = $TeamController;
	}
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
		// Xóa user trong team
		$this->TeamController->DeleteMemberAdmin($id);
		// Xóa user trong follow
		$user->delete();
		$request->session()->flash('success', 'Xóa tài khoản thành công');
		return redirect()->route('admin.user');
	}
	// 	Lịch sử đọc
	public function UserHistoryRead()
	{
		// Check Login
		if (auth()->check()) {
			// Lấy lịch sử đọc
			$historyReadList = $this->HistoryReadController->HistoryReadList(auth()->user()->id);
		}
		return Inertia::render('Client/Page/HistoryRead', [
			'historyReadList' => $historyReadList ?? null,
		]);
	}
}
