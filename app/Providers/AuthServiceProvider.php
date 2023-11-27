<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class AuthServiceProvider extends ServiceProvider
{
	/**
	 * The model to policy mappings for the application.
	 *
	 * @var array<class-string, class-string>
	 */
	protected $policies = [
		//
	];

	/**
	 * Register any authentication / authorization services.
	 */
	public function boot(): void
	{
		VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
			return (new MailMessage)
				->subject(Lang::get('Xác minh tài khoản'))
				->greeting(Lang::get('Xin chào!'))
				->line(Lang::get('Bạn đã đăng ký tài khoản thành công.'))
				->line(Lang::get('Bấm vào nút sau để xác minh tài khoản của bạn.'))
				->action(Lang::get('Xác minh tài khoản'), $url)
				->line(Lang::get('Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.'))
				->salutation(Lang::get('Trân trọng, ' . config('app.name') . '.'));
		});
	}
}