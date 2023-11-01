<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\Vol;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TeamController extends Controller
{
	//
	public function TeamIndex()
	{
		// Lấy dữ liệu từ session
		$status = ['success' => session('success'), 'error' => session('error')];
		// Lấy dữ liệu từ bảng team_user
		$team_user = TeamUser::where('id_user', auth()->user()->id)->first();
		if (!$team_user) {
			return Inertia::render('Client/Team/Team', [
				'team_user' => $team_user,
				'status' => $status
			]);
		} else {
			// Lấy novel có id_team = id của team
			$team = TeamUser::with('team')->where('id_user', auth()->user()->id)->first();
			$novel = Novel::where('id_team', $team->id_team)->get();
			$team_member = TeamUser::with('user')->where('id_team',$team->id_team)->get();
			return Inertia::render('Client/Team/Team', [
				'team_user' => $team_user,
				'team_member' => $team_member,
				'team' => $team,
				'novel' => $novel,
				'status' => $status,
			]);
		}
	}
	// Hiện Novel chi tiết trong team
	public function TeamNovel(Request $request, $id)
	{
		$novel = Novel::where('id', $id)->first();
		$vol = Vol::where('id_novel', $id)->with('chap:id,id_vol,title,created_at')->get();
		$status = ['success' => session('success'), 'error' => session('error')];
		return Inertia::render('Client/Team/TeamNovel', [
			'novel' => $novel,
			'vol' => $vol,
			'status' => $status,
		]);
	}

	public function TeamAdmin()
	{
		$team = Team::all();
		return Inertia::render('Admin/Team/Team', [
			'team' => $team,
		]);
	}

	public function TeamCreate()
	{
		return Inertia::render('Client/Team/TeamCreate');
	}

	public function TeamUpdateIndex(Request $request, Team $team)
	{
		return Inertia::render('Client/Team/TeamUpdate', [
			'team' => $team
		]);
	}
	public function TeamUpdate(Request $request, Team $team)
	{
		$request->validate([
			'team_name' => ['required', 'string', 'max:255', 'min:5'],
			'team_detail' => ['required', 'string'],
		], [
			'team_name.required' => 'Tên nhóm không được để trống',
			'team_name.string' => 'Tên nhóm phải là chuỗi',
			'team_name.max' => 'Tên nhóm không được quá 255 ký tự',
			'team_name.min' => 'Tên nhóm không được dưới 5 ký tự',
			'team_detail.required' => 'Chi tiết không được để trống',
			'team_detail.string' => 'Chi tiết phải là chuỗi',
		]);
		Team::where('id', $team->id)->update([
			'team_name' => $request->team_name,
			'team_detail' => $request->team_detail,
			'slug' => $team->id . '-' . Str::of($request->team_name)->slug('-'),
		]);
		return redirect()->route('team.index')->with('success', 'Cập nhật thành công');
	}

	public function TeamStore(Request $request)
	{
		// Để show dữ liệu từ form
		// dd($request->all());
		$request->validate([
			'team_name' => ['required', 'string', 'max:255', 'min:5'],
		], [
			'team_name.required' => 'Tên nhóm không được để trống',
			'team_name.max' => 'Tên nhóm không được quá 255 ký tự',
			'team_name.min' => 'Tên nhóm không được dưới 5 ký tự',
		]);

		// Tạo mới team
		$team = Team::create([
			'team_name' => $request->team_name,
			'team_detail' => $request->team_detail,
		]);

		// Cập nhật slug
		$newSlug = $team->id . '-' . Str::of($request->team_name)->slug('-');
		$team->slug = $newSlug;
		$team->save();

		// Tạo mới team_user
		TeamUser::create([
			'id_user' => auth()->user()->id,
			'id_team' => $team->id,
			'team_role' => 1,
		]);

		return redirect()->route('team.index');
	}
	// Thêm thành viên
	public function TeamMember(Team $team)
	{
		$status = ['success' => session('success'), 'error' => session('error')];
		return Inertia::render('Client/Team/TeamMember', ['team' => $team, 'status' => $status]);
	}
	public function AddMember(Request $request, Team $team)
	{
		$request->validate([
			'email' => ['required', 'string', 'max:255', 'min:5'],
		], [
			'email.required' => 'Email không được để trống',
			'email.max' => 'Email không được quá 255 ký tự',
			'email.min' => 'Email không được dưới 5 ký tự',
		]);
		$user = User::where('email', $request->email)->first();
		if (!$user) {
			return redirect()->back()->with('error', 'Tài khoản không tồn tại');
		} else {
			$team_user = TeamUser::where('id_user', $user->id)->first();

			if ($team_user) {
				return redirect()->back()->with('error', 'Tài khoản đã có nhóm');
			}
			TeamUser::create([
				'id_user' => $user->id,
				'id_team' => $team->id,
				'team_role' => 0,
			]);
			return redirect()->route('team.index')->with('success', 'Thêm thành viên thành công');
		}
	}
}