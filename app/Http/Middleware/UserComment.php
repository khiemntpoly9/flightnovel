<?php

namespace App\Http\Middleware;

use App\Models\Comment;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserComment
{
	// Xác thực user comment
	public function handle(Request $request, Closure $next): Response
	{
		$comment = Comment::find($request->route("id"));
		if (Auth::user()->isAdmin()) {
			return $next($request);
		} else {
			if ($comment->id_user != auth()->user()->id) {
				return redirect()->back();
			}
			return $next($request);
		}
	}
}
