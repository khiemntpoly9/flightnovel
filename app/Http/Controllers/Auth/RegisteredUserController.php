<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
	/**
	 * Display the registration view.
	 */
	public function create(): Response
	{
		return Inertia::render('Auth/Register');
	}

	// Đăng ký tài khoản
	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'name' => 'required|string|max:255|min:5',
			'email' => 'required|string|email|max:255|unique:' . User::class,
			'password' => ['required', 'confirmed', 'min:8', Rules\Password::defaults()],
		], [
			'name.required' => 'Tên không được bỏ trống',
			'name.max' => 'Tên không được quá 255 ký tự',
			'name.min' => 'Tên không được dưới 8 ký tự',
			'email.required' => 'Email không được bỏ trống',
			'email.email' => 'Email không đúng định dạng',
			'email.unique' => 'Email đã tồn tại',
			'password.required' => 'Mật khẩu không được bỏ trống',
			'password.confirmed' => 'Mật khẩu không trùng khớp',
			'password.min' => 'Mật khẩu không được dưới 5 ký tự',
		]);

		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
		]);

		// Cập nhật slug
		$userID = $user->id;
		$newSlug = $userID . '-' . Str::of($request->name)->slug('-');
		$user->slug = $newSlug;
		$user->save();

		event(new Registered($user));

		Auth::login($user);

		return redirect(RouteServiceProvider::HOME);
	}
}
