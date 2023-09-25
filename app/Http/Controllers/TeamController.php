<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
	//
	public function TeamIndex()
	{
		return Inertia::render('Client/Team/Team');
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
		Team::create([
			'id_user' => auth()->user()->id,
			'team_name' => $request->team_name,
			'team_detail' => $request->team_detail,
		]);
		return Inertia::render('Client/Team/TeamCreate', [
			'successMessage' => 'Tạo nhóm thành công',
		]);
	}
}