<?php

use App\Http\Controllers\CateController;
use App\Http\Controllers\ChapController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PreNextController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VolController;
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
	Route::get('/list', [NovelController::class, 'NovelList'])->name('novel.list');
	Route::get('/chapter-new', [PageController::class, 'PageChapNew'])->name('novel.chapter.new');
	Route::get('/{novel:slug}', [NovelController::class, 'NovelRead'])->name('novel.read');
	Route::get('/{novel:slug}/{vol:slug}/{chap:slug}', [ChapController::class, 'Chapter'])->middleware(['view.rate.limit'])->name('novel.chapter');
	Route::get('/{novel:slug}/{vol:slug}/{chap:slug}/next', [PreNextController::class, 'Next'])->name('novel.chapter.next');
	Route::get('/{novel:slug}/{vol:slug}/{chap:slug}/prev', [PreNextController::class, 'Prev'])->name('novel.chapter.prev');
	// Route::get('/{novel:slug}/vol/{id_vol}', [VolController::class, 'VolRead'])->name('vol.read');
	// Route::get('/{id}/vol/{id_vol}/chap/{id_chap}', [ChapController::class, 'ChapRead'])->name('chap.read');
});

// Follow
Route::middleware('auth')->prefix('follow')->group(function () {
	Route::get('/', [NovelController::class, 'FollowIndex'])->name('follow.index');
	Route::post('/{id}', [NovelController::class, 'NovelFollow'])->name('novel.follow');
	Route::delete('/{id}', [NovelController::class, 'NovelUnFollow'])->name('novel.unfollow');
});

// Notification
// Route::get('/notify-novel/{id}/{slug_chap}', [NotificationController::class, 'index'])->name('notification.novel');

// Comment
Route::middleware('auth')->prefix('comment')->group(function () {
	Route::post('/post', [CommentController::class, 'CommentCreate'])->name('novel.comment');
	Route::delete('/{id}/delete', [CommentController::class, 'NovelCommentDelete'])->middleware(['user.comment'])->name('novel.comment.delete');
});

// Rating
Route::middleware('auth')->prefix('rating')->group(function () {
	Route::post('/post', [RatingController::class, 'RatingCreate'])->name('novel.rating');
});

// Search
Route::prefix('search')->group(function () {
	Route::get('/', [SearchController::class, 'Search'])->name('search.index');
	Route::post('/', [SearchController::class, 'SearchAll'])->name('search.all');
});

// Profile - Auth Role
Route::middleware('auth')->prefix('profile')->group(function () {
	Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::get('/update', [ProfileController::class, 'updateAccount'])->name('profile.create');
	Route::patch('/update', [ProfileController::class, 'update'])->name('profile.update');
	Route::post('/update/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
	Route::get('/changepass', [ProfileController::class, 'changePasswordPage'])->name('profile.changepass.page');
});

// Team Role - Auth Role
Route::middleware('auth')->prefix('team')->group(function () {
	Route::get('/', [TeamController::class, 'TeamIndex'])->name('team.index');
	Route::get('/{team:slug}/edit', [TeamController::class, 'TeamUpdateIndex'])->name('team.edit');
	Route::patch('/{team:slug}/update', [TeamController::class, 'TeamUpdate'])->name('team.update');
	Route::get('/{team:slug}/add-member', [TeamController::class, 'TeamMember'])->name('team.member');
	Route::post('/{team:slug}/add-member', [TeamController::class, 'AddMember'])->name('team.addmember');
	Route::delete('/{team:slug}/delete/{id}', [TeamController::class, 'DeleteMember'])->name('team.deletemember');
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
			Route::get('/{novel:slug}', [TeamController::class, 'TeamNovel'])->name('team.novel');
			Route::prefix('{novel:slug}')->group(function () {
				// Update Novel
				Route::get('/edit', [NovelController::class, 'NovelUpdatePage'])->name('novel.edit');
				Route::post('/update', [NovelController::class, 'NovelUpdate'])->name('novel.update');
				Route::post('/public', [NovelController::class, 'SelectPublic'])->name('novel.public');
				Route::post('/status', [NovelController::class, 'StatusPublic'])->name('novel.status');
				Route::delete('/delete/{id}', [NovelController::class, 'DeleteNovel'])->name('novel.delete');
				// Create Vol
				Route::get('/create-vol', [VolController::class, 'VolIndex'])->name('vol.index');
				Route::post('/create-vol', [VolController::class, 'VolStore'])->name('vol.create');
				// Vol
				Route::prefix('{vol:slug}')->group(function () {
					Route::get('/edit', [VolController::class, 'VolUpdatePage'])->name('vol.edit');
					Route::patch('/update', [VolController::class, 'VolUpdate'])->name('vol.update');
					Route::delete('/delete', [VolController::class, 'VolDelete'])->name('vol.delete');
					// Chap
					Route::get('/create-chap', [ChapController::class, 'ChapCreate'])->name('chap.create');
					Route::post('/create-chap', [ChapController::class, 'ChapStore'])->name('chap.store');
					Route::prefix('{chap:slug}')->group(function () {
						Route::get('/edit', [ChapController::class, 'ChapUpdate'])->name('chap.edit');
						Route::patch('/update', [ChapController::class, 'ChapUpdatePatch'])->name('chap.update');
						Route::delete('/delete', [ChapController::class, 'ChapDelete'])->name('chap.delete');
					});
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
	Route::post('/categories', [CateController::class, 'CateStore'])->name('admin.categories.store');
	Route::patch('/categories', [CateController::class, 'CateUpdate'])->name('admin.categories.update');
	Route::delete('/categories/{id}', [CateController::class, 'CateDelete'])->name('admin.categories.delete');
	Route::get('/categories/detail/{id}', [CateController::class, 'CateDetail'])->name('admin.categories.detail');
	Route::get('/user', [UserController::class, 'UserIndex'])->name('admin.user');
	Route::delete('/user-delete/{id}', [UserController::class, 'UserDelete'])->name('admin.user.delete');
	Route::get('/team', [TeamController::class, 'TeamAdmin'])->name('admin.team');
	Route::get('/team/detail/{id}', [TeamController::class, 'TeamDetailAdmin'])->name('admin.teamdetail');
	Route::get('/novel', [NovelController::class, 'NovelAdmin'])->name('admin.novel');
	Route::delete('delete/novel/{id}', [NovelController::class, 'DeleteNovel'])->name('admin.novel.delete');
});

// Login Provider
Route::get('/auth/{provider}', [ProviderController::class, 'redirect'])->name('redirect');
Route::get('/auth/{provider}/callback', [ProviderController::class, 'callback'])->name('callback');

require __DIR__ . '/auth.php';
