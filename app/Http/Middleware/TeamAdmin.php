<?php

namespace App\Http\Middleware;

use App\Models\Team;
use App\Models\TeamUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamAdmin
{
	public function handle(Request $request, Closure $next): Response
	{
		$team_slug = $request->route()->parameter('team');
		// Kiểm tra xem có truyền slug hay không
		if ($team_slug) {
			// Kiểm tra xem slug có phải là string hay không
			if (is_string($team_slug)) {
				$team_slug = $request->route()->parameter('team');
			} else {
				// Lấy slug từ route
				$team_slug = $request->route()->parameter('team')['slug'];
			}
		}
		$team = Team::where('slug', $team_slug)->first();
		// Check login
		if (!auth()->check()) {
			return redirect()->route('team.index')->with('error', 'Bạn cần đăng nhập để thực hiện hành động này');
		} {
			$user = auth()->user();
			if ($user && $user->role->short_role === "admin") {
				return $next($request);
			} else {
				if (!$team) {
					return redirect()->route('team.index')->with('error', 'Nhóm không tồn tại');
				} else {
					$id_user = auth()->user()->id;
					$user = TeamUser::where('id_team', $team->id)->where('id_user', $id_user)->first();
					if (!$user) {
						return redirect()->route('team.index')->with('error', 'Bạn không có quyền cho nhóm này');
					}
					if ($user->team_role === 0) {
						return redirect()->route('team.index')->with('error', 'Bạn không có quyền thực hiện hành động này');
					}
				}
			}
		}
		return $next($request);
	}
}
