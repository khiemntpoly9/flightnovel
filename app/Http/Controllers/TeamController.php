<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\Vol;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
			return Inertia::render('Client/Team/Team', [
				'team_user' => $team_user,
				'team' => $team,
				'novel' => $novel,
				'status' => $status,
			]);
		}
	}
	// Hiện Novel chi tiết trong team
	public function TeamNovel(Request $request)
	{
		// Lấy dữ liệu novel từ middleware
		$novel = $request->get('novel');
		$vol = Vol::where('id_novel', $novel->id)->with('chap:id,id_vol,title,slug,created_at')->get();
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

	public function TeamDetailAdmin($id)
	{
		$team = Team::where('id', $id)->first();
		return Inertia::render('Admin/Team/TeamDetail', [
			'team' => $team,
		]);
	}

	public function TeamCreate()
	{
		return Inertia::render('Client/Team/TeamCreate');
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

		// Tạo mới team_user
		TeamUser::create([
			'id_user' => auth()->user()->id,
			'id_team' => $team->id,
			'team_role' => 1,
		]);

		return redirect()->route('team.index');
	}
}