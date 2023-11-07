<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\NotifyNovel;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
	// Khai báo biến
	protected $UserController;
	protected $NovelController;
	// Khởi tạo
	public function __construct(UserController $UserController, NovelController $NovelController)
	{
		$this->UserController = $UserController;
		$this->NovelController = $NovelController;
	}
	public function index($id, $chap)
	{
		// Lấy tất cả users trong follow
		$users_follow = $this->UserController->getAllUserFollow($id);
		// Lấy id user
		$user_follow_arr = [];
		foreach ($users_follow as $user) {
			$user_follow_arr[] = $user['id_user']; // Thay 'columnName' bằng tên cột bạn muốn lấy giá trị.
		}
		// Lấy thông tin user
		$users = User::whereIn('id', $user_follow_arr)->get();
		// Lấy thông tin novel
		$novel = $this->NovelController->NovelGetId($id);
		// Nội dung thông báo
		$notify_novel['name_novel'] = $novel->name_novel;
		$notify_novel['title'] = $chap->title;
		// Gửi thông báo cho các user
		foreach ($users as $user) {
			$user->notify(new NotifyNovel($notify_novel));
		}
	}
}
