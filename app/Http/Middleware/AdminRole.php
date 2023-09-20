<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRole
{
    /**
     * Admin Role
     * auth() là một helper function của Laravel
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Lấy thông tin user đang đăng nhập
        $user = auth()->user();
        // Log thông tin user đang đăng nhập
        // dd($user->role->short_role);
        if ($user && $user->role->short_role === "admin") {
            return $next($request);
        }
        return redirect("/");
    }
}