<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
	/**
	 * Display the user's profile form.
	 */
	public function edit(Request $request): Response
	{
		return Inertia::render('Client/Profile/Edit', [
			'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
			'status' => session('status'),
		]);
	}
	public function updateAccount()
	{
		return Inertia::render('Client/Profile/Partials/UpdateProfileInformationForm');
	}


	/**
	 * Update the user's profile information.
	 */
	// public function update(ProfileUpdateRequest $request): RedirectResponse
	// {
	// 	$request->user()->fill($request->validated());

	// 	if ($request->user()->isDirty('email')) {
	// 		$request->user()->email_verified_at = null;
	// 	}

	// 	$request->user()->save();

	// 	return Redirect::route('profile.edit');
	// }
	public function avatarupdate(Request $request)
	{
		// Lấy tệp đã xác minh
		// $file = $request->hasFile('avatar');

		// Storage::disk('digitalocean')->delete("avatar/baymax.jpg");
		// Lưu tệp vào thư mục hoặc thực hiện xử lý khác
		// $path = $file->store('uploads');
		// try {
		// 	Storage::disk('digitalocean')->delete("avatar/tesrtgg.jpg");
		// 	return "Đã xóa tệp tin thành công!";
		// } catch (\Exception $e) {
		// 	return "Lỗi khi xóa tệp tin: " . $e->getMessage();
		// }
		$filePath = "avatar/baymax.jpg";
		if (Storage::disk('digitalocean')->exists($filePath)) {
			Storage::disk('digitalocean')->delete($filePath);
			return "Đã xóa tệp tin thành công!";
		} else {
			return "Tệp tin không tồn tại.";
		}
	}

	public function update(Request $request)
	{
		$request->validate([
			'name' => ['required', 'string', 'max:255', 'min:5'],
		], [
			'name.required' => 'Tên tài khoản không được để trống',
			'name.max' => 'Tên tài khoản không được quá 255 ký tự',
			'name.min' => 'Tên tài khoản không được dưới 5 ký tự',
		]);
		$user = User::where('id', auth()->user()->id)->first()->update([
			'name' => $request->name,
		]);
		$request->session()->flash('success', 'Cập nhật tài khoản thành công');
		return redirect()->route('profile.edit');
	}

	/**
	 * Delete the user's account.
	 */
	public function destroy(Request $request): RedirectResponse
	{
		$request->validate([
			'password' => ['required', 'current_password'],
		]);

		$user = $request->user();

		Auth::logout();

		$user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return Redirect::to('/');
	}
}