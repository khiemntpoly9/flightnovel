<?php

namespace App\Http\Middleware;

use App\Models\Novel;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NovelPublish
{
	public function handle(Request $request, Closure $next): Response
	{
		$novel_slug = $request->route()->parameter('novel');
		// Kiểm tra xem có truyền slug hay không
		if ($novel_slug) {
			// Kiểm tra xem slug có phải là string hay không
			if (is_string($novel_slug)) {
				$novel_slug = $request->route()->parameter('novel');
			} else {
				// Lấy slug từ route
				$novel_slug = $request->route()->parameter('novel')['slug'];
			}
		}
		$novel = Novel::where('slug', $novel_slug)->first();
		if ($novel->is_publish == 0) {
			return redirect('/');
		}
		return $next($request);
	}
}
