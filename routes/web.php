<?php

use App\Http\Controllers\CateController;
use App\Http\Controllers\ChapController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\VolController;
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
// Home
Route::get('/', [HomeController::class, 'HomeIndex'])->name('home');

// Novel Read User
Route::prefix('novel')->group(function () {
	Route::get('/{id}', [NovelController::class, 'NovelRead'])->name('novel.read');
	Route::get('/{id}/vol/{id_vol}', [VolController::class, 'VolRead'])->name('vol.read');
	Route::get('/{id}/vol/{id_vol}/chap/{id_chap}', [ChapController::class, 'ChapRead'])->name('chap.read');
});
// Profile - Auth Role
Route::middleware('auth')->prefix('profile')->group(function () {
	Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::get('/update', [ProfileController::class, 'updateAccount'])->name('profile.create');
	Route::patch('/update', [ProfileController::class, 'update'])->name('profile.update');
	Route::post('/update/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
});

// Team Role - Auth Role
Route::middleware('auth')->prefix('team')->group(function () {
	Route::get('/', [TeamController::class, 'TeamIndex'])->name('team.index');
	// Team Role
	Route::middleware('team')->group(function () {
		Route::get('/create', [TeamController::class, 'TeamCreate'])->name('team.create');
		Route::post('/create', [TeamController::class, 'TeamStore'])->name('team.store');
	});
	// Novel
	Route::prefix('novel')->group(function () {
		Route::get('/create', [NovelController::class, 'NovelIndex'])->name('novel.index');
		Route::post('/create', [NovelController::class, 'NovelCreate'])->name('novel.create');
		// Team User Role
		Route::middleware('team.user')->group(function () {
			Route::get('/{id}', [TeamController::class, 'TeamNovel'])->middleware('team.user')->name('team.novel');
			// Vol
			Route::prefix('{id}/vol')->group(function () {
				Route::get('/', [VolController::class, 'VolIndex'])->name('vol.index');
				Route::get('/{id_vol}', [VolController::class, 'VolUpdatePage'])->name('vol.update.page');
				Route::patch('/{id_vol}', [VolController::class, 'VolUpdate'])->name('vol.update');
				Route::post('/', [VolController::class, 'VolStore'])->name('vol.create');
				Route::delete('/{id_vol}', [VolController::class, 'VolDelete'])->name('vol.delete');
				// Chap
				Route::prefix('{id_vol}/chap')->group(function () {
					Route::get('/create-chap', [ChapController::class, 'ChapCreate'])->name('chap.create');
					Route::post('/create-chap', [ChapController::class, 'ChapStore'])->name('chap.store');
					Route::get('/update-chap/{id_chap}', [ChapController::class, 'ChapUpdate'])->name('chap.update');
					Route::patch('/update-chap/{id_chap}', [ChapController::class, 'ChapUpdatePatch'])->name('chap.update.patch');
					Route::delete('/delete/{id_chap}', [ChapController::class, 'ChapDelete'])->name('chap.delete');
				});
			});
		});
	});
});

// Admin Role
Route::middleware('admin')->prefix('admin')->group(function () {
	Route::get('/', function () {
		return Inertia::render('Admin/AdminMain');
	})->name('admin.home');
	Route::get('/categories', [CateController::class, 'CateIndex'])->name('admin.categories');
	Route::get('/team', [TeamController::class, 'TeamAdmin'])->name('admin.team');
	Route::get('/novel', [NovelController::class, 'NovelAdmin'])->name('admin.novel');
	Route::post('/categories', [CateController::class, 'CateStore'])->name('admin.categories.store');
	Route::patch('/categories', [CateController::class, 'CateUpdate'])->name('admin.categories.update');
	Route::delete('/categories/{id}', [CateController::class, 'CateDelete'])->name('admin.categories.delete');
	Route::get('/categories/detail/{id}', [CateController::class, 'CateDetail'])->name('admin.categories.detail');
});

// Login Provider
Route::get('/auth/{provider}', [ProviderController::class, 'redirect'])->name('redirect');
Route::get('/auth/{provider}/callback', [ProviderController::class, 'callback'])->name('callback');

require __DIR__ . '/auth.php';