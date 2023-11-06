<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
	//
	public function getAllUser()
	{
		$users = User::with('role')->get();
		return $users;
	}
	// 
	public function UserIndex()
	{

		return Inertia::render('Admin/User/ManagerUser', [
			'users' => $this->getAllUser(),
		]);
	}
	public function UserDelete(Request $request, $id)
	{
		$user = User::find($id);
		$user->delete();
		$request->session()->flash('success', 'Xóa tài khoản thành công');
		return redirect()->route('admin.user');

	}
}
