<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\RateLimiter;

class ViewRateLimit
{
	public function handle(Request $request, Closure $next): Response
	{
		$executed = RateLimiter::attempt(
			'send-message:' . $request->ip(),
			$perMinute = 5,
			function () {
				return true;
			}
		);
		if (!$executed) {
			$request->merge(['status_limit_view' => false]);
		} else {
			$request->merge(['status_limit_view' => true]);
		}
		return $next($request);
	}
}
