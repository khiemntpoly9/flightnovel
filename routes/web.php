<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return Inertia::render('Client/Home', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
	]);
});

// Route::get('/test', function () {
//     return Inertia::render('Test');
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Team
// Route::middleware('auth')->group(function () {
// 	Route::get('/team', [TeamController::class, 'TeamIndex'])->name('team.index');
// });
Route::middleware('auth')->prefix('team')->group(function () {
	Route::get('/', [TeamController::class, 'TeamIndex'])->name('team.index');
	Route::get('/create', [TeamController::class, 'TeamCreate'])->name('team.create');
	Route::post('/create', [TeamController::class, 'TeamStore'])->name('team.store');
});

// Admin
Route::middleware('admin')->group(function () {
	Route::get('/admin', function () {
		return Inertia::render('Admin/AdminMain');
	})->name('admin.home');
});

require __DIR__ . '/auth.php';