<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
	/**
	 * The application's global HTTP middleware stack.
	 *
	 * These middleware are run during every request to your application.
	 *
	 * Có thể khai báo thêm Middleware ở đây
	 */
	protected $middleware = [
			// \App\Http\Middleware\TrustHosts::class,
		\App\Http\Middleware\TrustProxies::class,
		\Illuminate\Http\Middleware\HandleCors::class,
		\App\Http\Middleware\PreventRequestsDuringMaintenance::class,
		\Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
		\App\Http\Middleware\TrimStrings::class,
		\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
	];

	/**
	 * The application's route middleware groups.
	 *
	 * Nhóm phần mềm trung gian của ứng dụng.
	 */
	protected $middlewareGroups = [
		'web' => [
			\App\Http\Middleware\EncryptCookies::class,
			\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
			\Illuminate\Session\Middleware\StartSession::class,
			\Illuminate\View\Middleware\ShareErrorsFromSession::class,
			\App\Http\Middleware\VerifyCsrfToken::class,
			\Illuminate\Routing\Middleware\SubstituteBindings::class,
			\App\Http\Middleware\HandleInertiaRequests::class,
			\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
		],

		'api' => [
				// \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
			\Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
			\Illuminate\Routing\Middleware\SubstituteBindings::class,
		],
	];

	/**
	 * Chứa các thuộc tính lớp phần mềm trung gian trong Laravel
	 */
	protected $middlewareAliases = [
		'auth' => \App\Http\Middleware\Authenticate::class,
		'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
		'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
		'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
		'can' => \Illuminate\Auth\Middleware\Authorize::class,
		'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
		'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
		'precognitive' => \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
		'signed' => \App\Http\Middleware\ValidateSignature::class,
		'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
		'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
		'admin' => \App\Http\Middleware\AdminRole::class,
		'team' => \App\Http\Middleware\TeamRole::class,
	];
}