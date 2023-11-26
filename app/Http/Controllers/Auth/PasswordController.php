<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
	/**
	 * Update the user's password.
	 */
	public function update(Request $request): RedirectResponse
	{
		$validated = $request->validate([
			'current_password' => ['required', 'current_password'],
			'password' => ['required', Password::defaults(), 'confirmed'],
		], [
			'current_password.required' => 'Mật khẩu hiện tại không được để trống',
			'current_password.current_password' => 'Mật khẩu hiện tại không đúng',
			'password.required' => 'Mật khẩu mới không được để trống',
			'password.confirmed' => 'Mật khẩu mới không trùng khớp',
		]);

		$request->user()->update([
			'password' => Hash::make($validated['password']),
		]);

		return redirect()->route('profile.edit')->with('success', 'Thay đổi mật khẩu thành công');
	}
}
