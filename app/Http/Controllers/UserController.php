<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Follow;
use App\Models\HistoryRead;
use App\Models\Rating;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
	// Khai báo biến
	protected $HistoryReadController;
	protected $TeamController;
	protected $NovelController;
	// Khởi tạo
	public function __construct(HistoryReadController $HistoryReadController, TeamController $TeamController, NovelController $NovelController)
	{
		$this->HistoryReadController = $HistoryReadController;
		$this->TeamController = $TeamController;
		$this->NovelController = $NovelController;
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
		// Xóa tất cả dữ liệu user trong bảng follow
		$follow = Follow::where('id_user', $id)->get();
		foreach ($follow as $key => $value) {
			$value->delete();
		}
		// Xóa tất cả dữ liệu user trong bảng comment
		$comment = Comment::where('id_user', $id)->get();
		foreach ($comment as $key => $value) {
			$value->delete();
		}
		// Xóa user trong bảng rating
		$rating = Rating::where('id_user', $id)->get();
		foreach ($rating as $key => $value) {
			$value->delete();
		}
		// Xóa user trong bảng history_read
		$history_read = HistoryRead::where('id_user', $id)->get();
		foreach ($history_read as $key => $value) {
			$value->delete();
		}
		// Xóa dữ liệu thông báo trong bảng notification
		DB::table('notifications')->where('notifiable_id', $id)->delete();
		// Chuyển null trong novel
		$novel = $this->NovelController->NovelUpdateIdUser($id);
		// Xóa user
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
