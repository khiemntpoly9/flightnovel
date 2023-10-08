<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class ProviderController extends Controller
{
	public function redirect($provider)
	{
		return Socialite::driver($provider)->redirect();
	}

	public function callback($provider)
	{
		try {
			// Lấy thông tin người dùng từ provider
			$SociaUser = Socialite::driver($provider)->user();
			// Kiểm tra email đã tồn tại trong CSDL chưa
			if (User::where('email', $SociaUser->getEmail())->exists()) {
				// Nếu tồn tại thì cập nhật lại thông tin
				User::where('email', $SociaUser->getEmail())->update([
					'provider' => $provider,
					'provider_id' => $SociaUser->getId(),
					'provider_token' => $SociaUser->token,
				]);
			}
			// Tìm tài khoản trong CSDL
			$user = User::where([
				'provider' => $provider,
				'provider_id' => $SociaUser->id,
			])->first();
			// Nếu tài khoản chưa tồn tại thì tạo mới
			if (!$user) {
				$user = User::create([
					'name' => $SociaUser->getName(),
					'email' => $SociaUser->getEmail(),
					'email_verified_at' => now(),
					'provider' => $provider,
					'provider_id' => $SociaUser->getId(),
					'provider_token' => $SociaUser->token,
					'avatar' => $SociaUser->getAvatar()
				]);
			}
			// Đăng nhập
			Auth::login($user);
			return redirect()->to('/');
		} catch (\Exception $e) {
			return redirect()->to('/login');
		}
	}
}