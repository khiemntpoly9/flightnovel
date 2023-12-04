<?php

namespace App\Http\Middleware;

use App\Models\TeamUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamRole
{
	// Xác thực user đã tạo nhóm hay chưa
	public function handle(Request $request, Closure $next): Response
	{
		$team_user = null;
		if (!auth()->check()) {
			return redirect()->route('login');
		} else {
			$team_user = TeamUser::where('id_user', auth()->user()->id)->first();
		}
		if ($team_user) {
			return redirect()->route('team.dashboard');
		}
		return $next($request);
	}
}