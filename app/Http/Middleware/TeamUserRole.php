<?php

namespace App\Http\Middleware;

use App\Models\Novel;
use App\Models\TeamUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamUserRole
{
	public function handle(Request $request, Closure $next): Response
	{
		$id_novel = $request->route()->parameter('id');
		$novel = Novel::where('id', $id_novel)->first();
		if (!$novel) {
			return redirect()->route('team.index')->with('error', 'Truyện không tồn tại');
		} else {
			$id_team = $novel->id_team;
			$user = TeamUser::where('id_team', $id_team)->where('id_user', auth()->user()->id)->first();
			if (!$user) {
				return redirect()->route('team.index')->with('error', 'Bạn không có quyền cho truyện này');
			}
			return $next($request);
		}
	}
}