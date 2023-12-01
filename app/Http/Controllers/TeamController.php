<?php

namespace App\Http\Controllers;

use App\Models\Novel;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\NovelCate;
use App\Models\Comment;
use App\Models\ViewNovel;
use App\Models\Vol;
use App\Models\Rating;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TeamController extends Controller
{
	// Khai báo biến
	protected $ViewController;
	protected $NovelController;
	// Khởi tạo
	public function __construct(NovelController $NovelController, ViewsController $ViewController)
	{
		$this->NovelController = $NovelController;
		$this->ViewController = $ViewController;
	}
	// Team Page
	public function TeamIndex()
	{
		// Lấy dữ liệu từ session
		$status = ['success' => session('success'), 'error' => session('error')];
		// Lấy dữ liệu từ bảng team_user
		$team_user = TeamUser::where('id_user', auth()->user()->id)->first();
		if (!$team_user) {
			return Inertia::render('Client/Team/Team', [
				'team_user' => $team_user,
				'status' => $status
			]);
		} else {
			// Lấy novel có id_team = id của team
			$team = TeamUser::with('team')->where('id_user', auth()->user()->id)->first();
			$novel = $this->NovelController->NovelGetIdTeam($team_user->id_team);
			$team_member = TeamUser::with('user')->where('id_team', $team->id_team)->get();
			return Inertia::render('Client/Team/Team', [
				'team_user' => $team_user,
				'team_member' => $team_member,
				'team' => $team,
				'novel' => $novel,
				'status' => $status,
				'views' => [
					$this->ViewController->TeamDayView($team->id_team, $novel),
					$this->ViewController->TeamWeekView($team->id_team, $novel),
					$this->ViewController->TeamMonthView($team->id_team, $novel)
				],
			]);
		}
	}
	// Hiện Novel chi tiết trong team
	public function TeamNovel(Request $request, $id)
	{
		// Novel
		$novel = Novel::where('id', $id)->first();
		// Categireis
		$categories = NovelCate::where('id_novel', $novel->id)->with('categories:id,name,slug')->get();
		// Vol
		$vol = Vol::where('id_novel', $id)->with('chap:id,id_vol,title,slug,created_at')->get();
		// Views
		$views = ViewNovel::where('id_novel', $novel->id)->first();
		// Status
		$status = ['success' => session('success'), 'error' => session('error')];
		// follow
		if (auth()->check()) {
			// Lấy id user
			$id_user = auth()->user()->id;
			$follow = Follow::where('id_user', $id_user)->where('id_novel', $novel->id)->first();
		} else {
			$follow = null;
		}
		// Rating
		$rating = Rating::where('id_novel', $novel->id)->get();
		$countRating = $rating->count();
		$totalRating = 0;
		foreach ($rating as $item) {
			$totalRating += $item->rating;
		}
		if ($countRating > 0) {
			$averageRating = round($totalRating / $countRating, 1);
		} else {
			$averageRating = 0; // Tránh lỗi chia cho 0 nếu mảng rỗng.
		}
		// Comment
		$comments = Comment::where('id_novel', $novel->id)->with('user:id,name,avatar')->orderBy('created_at', 'desc')->paginate($perPage = 6, $columns = ['*'], $pageName = 'comment');
		// Lấy số lượng follow
		$follow_count = Follow::where('id_novel', $novel->id)->count();
		return Inertia::render('Client/Team/TeamNovel', [
			'novel_main' => [
				'novel' => $novel,
				'views' => $views,
				'categories' => $categories,
			],
			'vol' => $vol,
			'follow' => [
				'status' => $follow,
				'count' => $follow_count,
			],
			'rating' => [
				'count' => $countRating,
				'total' => $totalRating,
				'average' => $averageRating,
			],
			'comments' => $comments,
			'status' => $status,
		]);
	}

	public function TeamAdmin()
	{
		$team = Team::all();
		return Inertia::render('Admin/Team/Team', [
			'team' => $team,
		]);
	}

	public function TeamCreate()
	{
		return Inertia::render('Client/Team/TeamCreate');
	}

	public function TeamUpdateIndex(Request $request, Team $team)
	{
		return Inertia::render('Client/Team/TeamUpdate', [
			'team' => $team
		]);
	}
	public function TeamUpdate(Request $request, Team $team)
	{
		$request->validate([
			'team_name' => ['required', 'string', 'max:255', 'min:5'],
			'team_detail' => ['required', 'string'],
		], [
			'team_name.required' => 'Tên nhóm không được để trống',
			'team_name.string' => 'Tên nhóm phải là chuỗi',
			'team_name.max' => 'Tên nhóm không được quá 255 ký tự',
			'team_name.min' => 'Tên nhóm không được dưới 5 ký tự',
			'team_detail.required' => 'Mô tả không được để trống',
			'team_detail.string' => 'Mô tả phải là chuỗi',
		]);
		Team::where('id', $team->id)->update([
			'team_name' => $request->team_name,
			'team_detail' => $request->team_detail,
			'slug' => $team->id . '-' . Str::of($request->team_name)->slug('-'),
		]);
		return redirect()->route('team.index')->with('success', 'Cập nhật thành công');
	}

	public function TeamStore(Request $request)
	{
		// Để show dữ liệu từ form
		// dd($request->all());
		$request->validate([
			'team_name' => ['required', 'string', 'max:255', 'min:5'],
			'team_detail' => ['required', 'string'],
		], [
			'team_name.required' => 'Tên nhóm không được để trống',
			'team_name.string' => 'Tên nhóm phải là chuỗi',
			'team_name.max' => 'Tên nhóm không được quá 255 ký tự',
			'team_name.min' => 'Tên nhóm không được dưới 5 ký tự',
			'team_detail.required' => 'Mô tả không được để trống',
			'team_detail.string' => 'Mô tả phải là chuỗi',
		]);

		// Tạo mới team
		$team = Team::create([
			'team_name' => $request->team_name,
			'team_detail' => $request->team_detail,
		]);

		// Cập nhật slug
		$newSlug = $team->id . '-' . Str::of($request->team_name)->slug('-');
		$team->slug = $newSlug;
		$team->save();

		// Tạo mới team_user
		TeamUser::create([
			'id_user' => auth()->user()->id,
			'id_team' => $team->id,
			'team_role' => 1,
		]);

		return redirect()->route('team.index');
	}
	// Thêm thành viên
	public function TeamMember(Team $team)
	{
		$status = ['success' => session('success'), 'error' => session('error')];
		return Inertia::render('Client/Team/TeamMember', ['team' => $team, 'status' => $status]);
	}
	public function AddMember(Request $request, Team $team)
	{
		$request->validate([
			'email' => ['required', 'string', 'max:255', 'min:5'],
		], [
			'email.required' => 'Email không được để trống',
			'email.max' => 'Email không được quá 255 ký tự',
			'email.min' => 'Email không được dưới 5 ký tự',
		]);
		$user = User::where('email', $request->email)->first();
		if (!$user) {
			return redirect()->back()->with('error', 'Tài khoản không tồn tại');
		} else {
			$team_user = TeamUser::where('id_user', $user->id)->first();

			if ($team_user) {
				return redirect()->back()->with('error', 'Tài khoản đã có nhóm');
			}
			TeamUser::create([
				'id_user' => $user->id,
				'id_team' => $team->id,
				'team_role' => 0,
			]);
			return redirect()->route('team.index')->with('success', 'Thêm thành viên thành công');
		}
	}

	public function DeleteMember(Request $request, Team $team, $id)
	{
		$teamID = Team::where('slug', $team->slug)->first()->id;
		$team_user = TeamUser::where('id_team', $teamID)->where('id_user', $id)->first(); // Tìm team_user cụ thể cần xóa
		if ($team_user) {
			if ($team_user->team_role === 0) {
				// Nếu tìm thấy, thì mới xóa nó
				$team_user->delete();
				return redirect()->route('team.index')->with('success', 'Xóa thành viên thành công');
			} elseif ($team_user->team_role === 1) {
				return redirect()->route('team.index')->with('error', 'Bạn không thể xóa chính bạn');
			}
		} else {
			// Nếu không tìm thấy, bạn có thể xử lý lỗi hoặc trả về thông báo không tìm thấy
			return redirect()->route('team.index')->with('error', 'Không tìm thấy thành viên để xóa');
		}
	}

	// Xóa thành viên (admin)
	public function DeleteMemberAdmin($id)
	{
		$team_user = TeamUser::where('id_user', $id)->first();
		if ($team_user) {
			$team_user->delete();
		}
	}
}