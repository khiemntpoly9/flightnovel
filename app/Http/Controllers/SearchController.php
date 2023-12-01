<?php

namespace App\Http\Controllers;



use App\Models\Novel;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class SearchController extends Controller
{
	// Khai báo biến
	protected $CateController;
	public function __construct(CateController $CateController)
	{
		$this->CateController = $CateController;
	}

	// Search
	public function Search()
	{
		return Inertia::render('Client/Search/Search', [
			'categories' => $this->CateController->CateAll(),
		]);
	}

	public function SearchAll(Request $request)
	{
		// Validate
		$request->validate([
			'search' => ['nullable', 'string', 'max:255'],

		], [

			'search.string' => 'Tên truyện phải là chuỗi',
			'search.max' => 'Tên truyện không được quá 255 ký tự',
		]);

		$search = $request->search;
		$status = $request->select;
		$categories = $request->categories;
		$query = Novel::where('is_publish', 1)->with('novelcate');

		// check điều kiện status
		if ($status) {
			$query->where('status', $status);
		}

		// check categories
		if ($categories) {
			$query->whereHas('novelcate', function ($query) use ($categories) {
				$query->whereIn('id_categories', $categories);
			});
		}

		// check Tên tác giả ,họa sĩ, tên truyện
		$query->where(function ($query) use ($search) {
			$query->where('name_novel', 'like', "%{$search}%")
				->orWhere('author', 'like', "%{$search}%")
				->orWhere('illustrator', 'like', "%{$search}%");
		});
		$novel = $query->orderBy('created_at', 'desc')->get();

		return Inertia::render('Client/Search/Search', [
			'categories' => $this->CateController->CateAll(),
			'novel' => $novel,
		]);
	}


	//Search admin
	public function SearchAdmin()
	{
		return Inertia::render('Admin/Novel/Novel', [
			'categories' => $this->CateController->CateAll(),
		]);

	}
	public function SearchAdminAll(Request $request)
	{
		// Validate
		$request->validate([
			'search' => ['nullable', 'string', 'max:255'],

		], [

			'search.string' => 'Tên truyện phải là chuỗi',
			'search.max' => 'Tên truyện không được quá 255 ký tự',
		]);

		$search = $request->search;
		$status = $request->select;
		$categories = $request->categories;
		$query = Novel::with('novelcate');

		// check điều kiện status
		if ($status) {
			$query->where('status', $status);
		}

		// check categories
		if ($categories) {
			$query->whereHas('novelcate', function ($query) use ($categories) {
				$query->whereIn('id_categories', $categories);
			});
		}

		// check Tên tác giả ,họa sĩ, tên truyện
		$query->where(function ($query) use ($search) {
			$query->where('name_novel', 'like', "%{$search}%")
				->orWhere('author', 'like', "%{$search}%")
				->orWhere('illustrator', 'like', "%{$search}%");
		});
		$novel = $query->orderBy('created_at', 'desc')->with('team')->get();


		return Inertia::render('Admin/Novel/Novel', [
			'categories' => $this->CateController->CateAll(),
			'novels' => $novel,
		]);
	}
	// Search user
	public function SearchUserAll(Request $request)
	{
		// Validate
		$request->validate([
			'search' => ['nullable', 'string', 'max:255'],

		], [

			'search.string' => 'Tên tài khoản, hoặc email phải là chuỗi',
			'search.max' => 'Tên tài khoản, hoặc email không được quá 255 ký tự',
		]);
		$search = $request->search;
		$query = User::query();

		$query->where(function ($query) use ($search) {
			$query->where('name', 'like', "%{$search}%")
				->orWhere('email', 'like', "%{$search}%");
		});
		$users = $query->with('role')->get();
		return Inertia::render(
			'Admin/User/ManagerUser',
			[
				'users' => $users
			]
		);
	}

	// Search team
	public function SearchTeamAll(Request $request)
	{
		// Validate
		$request->validate([
			'search' => ['nullable', 'string', 'max:255'],

		], [

			'search.string' => 'Tên nhóm phải là chuỗi',
			'search.max' => 'Tên nhóm không được quá 255 ký tự',
		]);
		$search = $request->search;
		$query = Team::query();

		$query->where(function ($query) use ($search) {
			$query->where('team_name', 'like', "%{$search}%");
		});
		$teams = $query->get();
		return Inertia::render(
			'Admin/Team/Team',
			[
				'team' => $teams
			]
		);
	}
}
