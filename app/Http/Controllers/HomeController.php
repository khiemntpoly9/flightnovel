<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
	public function HomeIndex()
	{
		// Lấy novel
		$novels = Novel::where('is_publish', 1)->orderBy('created_at', 'desc')->get();

		return Inertia::render('Client/Home', [
			'novels' => $novels,
			'canLogin' => Route::has('login'),
			'canRegister' => Route::has('register'),

		]);
	}
}
