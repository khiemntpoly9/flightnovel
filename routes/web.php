<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CateController;
use App\Http\Controllers\ChapController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PreNextController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViewsController;
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
	Route::get('/{novel:slug}', [NovelController::class, 'NovelRead'])->middleware(['novel.publish'])->name('novel.read');
	Route::get('/{novel:slug}/{vol:slug}/{chap:slug}', [ChapController::class, 'Chapter'])->middleware(['view.rate.limit'])->name('novel.chapter');
	Route::get('/{novel:slug}/{vol:slug}/{chap:slug}/next', [PreNextController::class, 'Next'])->name('novel.chapter.next');
	Route::get('/{novel:slug}/{vol:slug}/{chap:slug}/prev', [PreNextController::class, 'Prev'])->name('novel.chapter.prev');
	// Route::get('/{novel:slug}/vol/{id_vol}', [VolController::class, 'VolRead'])->name('vol.read');
	// Route::get('/{id}/vol/{id_vol}/chap/{id_chap}', [ChapController::class, 'ChapRead'])->name('chap.read');
});

// Novel for Category
Route::get('/category/{cate:slug}', [PageController::class, 'PageNovelForCate'])->name('novel.category');

// Follow
Route::middleware('auth')->prefix('follow')->group(function () {
	Route::get('/', [NovelController::class, 'FollowIndex'])->name('follow.index');
	Route::post('/{id}', [NovelController::class, 'NovelFollow'])->name('novel.follow');
	Route::delete('/{id}', [NovelController::class, 'NovelUnFollow'])->name('novel.unfollow');
});

// Notification
Route::get('/notify/delete-all', [NotificationController::class, 'notifyDeleteAll'])->middleware('auth')->name('notification.delete');

// Comment
Route::middleware('auth')->prefix('comment')->group(function () {
	Route::post('/post', [CommentController::class, 'CommentCreate'])->name('novel.comment');
	Route::delete('/{id}/delete', [CommentController::class, 'NovelCommentDelete'])->middleware(['user.comment'])->name('novel.comment.delete');
});

// History read
Route::middleware('auth')->prefix('history')->group(function () {
	Route::get('/', [UserController::class, 'UserHistoryRead'])->name('history.index');
	Route::delete('/{id}', [NovelController::class, 'HistoryDelete'])->name('history.delete');
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
Route::prefix('team')->group(function () {
	Route::get('/', [TeamController::class, 'TeamIndex'])->name('team.index');
	// Team Role - Tạo nhóm
	Route::middleware(['team', 'auth'])->group(function () {
		Route::get('/create', [TeamController::class, 'TeamCreate'])->name('team.create');
		Route::post('/create', [TeamController::class, 'TeamStore'])->name('team.store');
	});
	// Team Dashboard
	Route::middleware('auth')->group(function () {
		Route::get('/dashboard', [TeamController::class, 'TeamDashboard'])->name('team.dashboard');
	});
	Route::prefix('{team:slug}')->group(function () {
		Route::get('/', [TeamController::class, 'TeamDetail'])->name('team.detail');
		Route::middleware(['auth'])->group(function () {
			Route::get('/edit', [TeamController::class, 'TeamUpdateIndex'])->middleware(['team.admin'])->name('team.edit');
			Route::patch('/update', [TeamController::class, 'TeamUpdate'])->middleware(['team.admin'])->name('team.update');
			Route::get('/add-member', [TeamController::class, 'TeamMember'])->middleware(['team.admin'])->name('team.member');
			Route::post('/add-member', [TeamController::class, 'AddMember'])->middleware(['team.admin'])->name('team.addmember');
			Route::delete('/delete/{id}', [TeamController::class, 'DeleteMember'])->middleware(['team.admin'])->name('team.delete.member');
			Route::delete('/delete', [TeamController::class, 'TeamDelete'])->middleware(['team.admin'])->name('team.delete');
		});
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
	Route::get('/', [AdminController::class, 'Dashboard'])->name('admin.home');
	Route::get('/categories', [CateController::class, 'CateIndex'])->name('admin.categories');
	Route::post('/categories', [CateController::class, 'CateStore'])->name('admin.categories.store');
	Route::patch('/categories', [CateController::class, 'CateUpdate'])->name('admin.categories.update');
	Route::delete('/categories/{id}', [CateController::class, 'CateDelete'])->name('admin.categories.delete');
	Route::get('/categories/detail/{id}', [CateController::class, 'CateDetail'])->name('admin.categories.detail');
	Route::get('/user', [UserController::class, 'UserIndex'])->name('admin.user');
	Route::post('/user', [SearchController::class, 'SearchUserAll']);
	Route::delete('/user-delete/{id}', [UserController::class, 'UserDelete'])->name('admin.user.delete');
	Route::get('/team', [TeamController::class, 'TeamAdmin'])->name('admin.team');
	Route::post('/team', [SearchController::class, 'SearchTeamAll']);
	Route::get('/team/{team:slug}', [AdminController::class, 'TeamDetailAdmin'])->name('admin.team.detail');
	Route::get('/novel', [AdminController::class, 'NovelAdmin'])->name('admin.novel');
	Route::post('/novel', [SearchController::class, 'SearchAdminAll']);

	Route::delete('delete/novel/{id}', [NovelController::class, 'DeleteNovel'])->name('admin.novel.delete');
});

// Login Provider
Route::get('/auth/{provider}', [ProviderController::class, 'redirect'])->name('redirect');
Route::get('/auth/{provider}/callback', [ProviderController::class, 'callback'])->name('callback');

require __DIR__ . '/auth.php';
