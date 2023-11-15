<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Chap;
use App\Models\Comment;
use App\Models\Detail;
use App\Models\Follow;
use App\Models\HistoryRead;
use App\Models\Novel;
use App\Models\NovelCate;
use App\Models\Rating;
use App\Models\TeamUser;
use App\Models\ViewNovel;
use App\Models\Vol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class NovelController extends Controller
{
	// Khai báo 
	protected $RatingController;
	// Khởi tạo
	public function __construct(RatingController $RatingController)
	{
		$this->RatingController = $RatingController;
	}
	// Novel Get Slug
	public function NovelGetSlug($slug)
	{
		$novel = Novel::where('slug', $slug)->first();
		return $novel;
	}
	// Novel lấy tất cả (public) / Phân trang
	public function NovelGetAllPublic()
	{
		$novels = Novel::where('is_publish', 1)->orderBy('created_at', 'desc')->paginate($perPage = 10, $columns = ['*'], $pageName = 'page');
		return $novels;
	}
	// Novel Get  Id
	public function NovelGetId($id)
	{
		$novel = Novel::where('id', $id)->first();
		return $novel;
	}
	// Page Novel
	public function NovelIndex()
	{
		// Lấy categories
		$categories = Categories::all();
		return Inertia::render('Client/Novel/Novel', [
			'categories' => $categories,
		]);
	}
	// Lấy truyện có chap mới nhất
	public function NovelGetChapNew()
	{
		// Lấy id_vol trong chap mới nhất
		$chap = Chap::orderBy('created_at', 'desc')->get();
		// Lấy mảng id_vol trong $chap, bỏ trùng lặp
		$id_vol = [];
		foreach ($chap as $item) {
			array_push($id_vol, $item->id_vol);
		}
		$id_vol = array_unique($id_vol);
		// Lấy id_novel trong bảng vol theo $id_vol
		$id_novel = [];
		foreach ($id_vol as $item) {
			$vol = Vol::where('id', $item)->first();
			array_push($id_novel, $vol->id_novel);
		}
		$id_novel = array_unique($id_novel);
		$novels = Novel::whereIn('id', $id_novel)->paginate($perPage = 10, $columns = ['*'], $pageName = 'page');
		return [$novels, $id_novel];
	}
	// Thêm truyện
	public function NovelCreate(Request $request)
	{
		// Validate
		$request->validate([
			'name_novel' => ['required', 'string', 'max:255'],
			'thumbnail' => ['image', 'mimes:png,jpg', 'max:3000'],
			'author' => ['required', 'string', 'max:255'],
			'illustrator' => ['required', 'string', 'max:255'],
			'categories' => ['required'],
			'summary' => ['required'],
		], [
			'name_novel.required' => 'Tên truyện không được để trống',
			'name_novel.string' => 'Tên truyện phải là chuỗi',
			'name_novel.max' => 'Tên truyện không được quá 255 ký tự',
			'thumbnail.image' => 'Ảnh không đúng định dạng',
			'thumbnail.mimes' => 'Ảnh phải là định dạng png, jpg',
			'thumbnail.max' => 'Ảnh không được quá 3MB',
			'author.required' => 'Tác giả không được để trống',
			'author.string' => 'Tác giả phải là chuỗi',
			'author.max' => 'Tác giả không được quá 255 ký tự',
			'illustrator.required' => 'Họa sĩ không được để trống',
			'illustrator.string' => 'Họa sĩ phải là chuỗi',
			'illustrator.max' => 'Họa sĩ không được quá 255 ký tự',
			'categories.required' => 'Thể loại không được để trống',
			'summary.required' => 'Tóm tắt không được để trống',
		]);
		// ID team
		$id_team = TeamUser::where('id_user', auth()->user()->id)->first()->id_team;
		// Thêm dữ liệu bảng detail
		$detail = Detail::create([
			'summary' => $request->summary,
			'note' => $request->note,
			'another_name' => $request->another_name
		]);
		// Upload ảnh
		$path = Storage::disk('digitalocean')->put('thumbnail', $request->file('thumbnail'), 'public');
		// Thêm truyện
		$novel = Novel::create([
			'name_novel' => $request->name_novel,
			'thumbnail' => 'https://flightnovel.sgp1.digitaloceanspaces.com/' . $path,
			'author' => $request->author,
			'illustrator' => $request->illustrator,
			'id_team' => $id_team,
			'id_detail' => $detail->id,
			'id_user' => auth()->user()->id,
		]);
		// Tạo bảng views
		ViewNovel::create([
			'id_novel' => $novel->id,
			'views' => 0,
			'daily_views' => 0,
			'weekly_views' => 0,
			'monthly_views' => 0,
		]);
		// Cập nhật slug
		$newSlug = $novel->id . '-' . Str::of($request->name_novel)->slug('-');
		$novel->slug = $newSlug;
		$novel->save();

		// Thêm truyện vào bảng novel_cate
		$categoryIds = explode(',', $request->categories);
		foreach ($categoryIds as $cateId) {
			NovelCate::create([
				'id_novel' => $novel->id,
				'id_categories' => $cateId,
			]);
		}

		return redirect()->route('team.index')->with('success', 'Thêm truyện thành công');
	}
	// Novel Update (Page)
	public function NovelUpdatePage(Request $request)
	{
		// Lấy id novel
		$novel = $request->get('novel');
		// Lấy categories
		$categories = Categories::all();
		// Lấy list categories
		$novel_cate = NovelCate::where('id_novel', $novel->id)->get();
		$detail = Detail::find($novel->id_detail);

		return Inertia::render('Client/Novel/NovelUpdate', [
			'novel' => $novel,
			'detail' => $detail,
			'categories' => $categories,
			'novel_cate' => $novel_cate,
		]);
	}

	// Sửa truyện
	public function NovelUpdate(Request $request)
	{
		// Get Novel
		$novel = $request->get('novel');
		// Validate
		if ($request->hasFile('thumbnail')) {
			$request->validate([
				'thumbnail' => ['image', 'mimes:png,jpg', 'max:3000'],
			], [
				'thumbnail.image' => 'Ảnh không đúng định dạng',
				'thumbnail.mimes' => 'Ảnh phải là định dạng png, jpg',
				'thumbnail.max' => 'Ảnh không được quá 3MB',
			]);
		}
		$request->validate([
			'name_novel' => ['required', 'string', 'max:255', 'min:5'],
			'author' => ['required', 'string', 'max:255'],
			'illustrator' => ['required', 'string', 'max:255'],
			'categories' => ['required'],
			'summary' => ['required'],
		], [
			'name_novel.required' => 'Tên truyện không được để trống',
			'name_novel.string' => 'Tên truyện phải là chuỗi',
			'name_novel.max' => 'Tên truyện không được quá 255 ký tự',
			'name_novel.min' => 'Tên truyện không được dưới 5 ký tự',
			'author.required' => 'Tác giả không được để trống',
			'author.string' => 'Tác giả phải là chuỗi',
			'author.max' => 'Tác giả không được quá 255 ký tự',
			'illustrator.required' => 'Họa sĩ không được để trống',
			'illustrator.string' => 'Họa sĩ phải là chuỗi',
			'illustrator.max' => 'Họa sĩ không được quá 255 ký tự',
			'categories.required' => 'Thể loại không được để trống',
			'summary.required' => 'Tóm tắt không được để trống',
		]);
		// Xóa thể loại truyện cũ
		NovelCate::where('id_novel', $novel->id)->delete();
		// Thêm thể loại truyện mới
		$categoryIds = explode(',', $request->categories);
		foreach ($categoryIds as $cateId) {
			NovelCate::create([
				'id_novel' => $novel->id,
				'id_categories' => $cateId,
			]);
		}
		// Check ảnh (true)
		if ($request->hasFile('thumbnail')) {
			$path_old = Novel::where('slug', $novel->slug)->first()->thumbnail;
			// Xóa ảnh cũ (Áp dụng link DigitalOcean, vì có trường hợp link avatar của Google)
			if ($path_old) {
				$pos = strpos($path_old, 'thumbnail');
				$path_old_cut = substr($path_old, $pos);
				// Tiến hành xóa
				Storage::disk('digitalocean')->delete($path_old_cut);
			}
			// Upload ảnh
			$path = Storage::disk('digitalocean')->put('thumbnail', $request->file('thumbnail'), 'public');
			// Cập nhật thumbnail
			Novel::where('slug', $novel->slug)->update([
				'thumbnail' => 'https://flightnovel.sgp1.digitaloceanspaces.com/' . $path,
			]);
		}
		// Sửa novel
		Novel::where('slug', $novel->slug)->update([
			'name_novel' => $request->name_novel,
			'author' => $request->author,
			'illustrator' => $request->illustrator,
			'id_user' => auth()->user()->id,
			'slug' => $novel->id . '-' . Str::of($request->name_novel)->slug('-')
		]);
		// Sửa dữ liệu bảng detail
		Detail::where('id', $novel->id_detail)->update([
			'summary' => $request->summary,
			'note' => $request->note,
			'another_name' => $request->another_name
		]);

		return redirect()->route('team.index')->with('success', 'Sửa truyện thành công');
	}
	// Admin Novel (Page)
	public function NovelAdmin()
	{
		$novels = Novel::with('team')->get();
		return Inertia::render('Admin/Novel/Novel', ['novels' => $novels]);
	}

	// Delete Novel (Status)
	public function DeleteNovel(Request $request, Novel $novel, $id)
	{
		// Xóa ảnh
		$path_old = Novel::where('id', $id)->first()->thumbnail;
		// Xóa ảnh cũ (Áp dụng link DigitalOcean, vì có trường hợp link avatar của Google)
		if ($path_old) {
			$pos = strpos($path_old, 'thumbnail');
			$path_old_cut = substr($path_old, $pos);
			// Tiến hành xóa
			Storage::disk('digitalocean')->delete($path_old_cut);
		}
		// Xóa novel_cate
		NovelCate::where('id_novel', $id)->delete();
		// Xóa rating
		$this->RatingController->RatingDelete($id);
		// Xóa view
		ViewNovel::where('id_novel', $id)->delete();
		// Xóa chap theo id_vol
		$vol = Vol::where('id_novel', $id)->get();
		foreach ($vol as $item) {
			Chap::where('id_vol', $item->id)->delete();
		}
		// Xóa vol
		Vol::where('id_novel', $id)->delete();
		// Xóa lịch sử đọc
		HistoryRead::where('id_novel', $id)->delete();
		// Xóa follow
		Follow::where('id_novel', $id)->delete();
		// Xóa comment
		Comment::where('id_novel', $id)->delete();
		// Xóa novel
		Novel::where('id', $id)->delete();
		// Xóa detail
		Detail::where('id', $novel->id_detail)->delete();

		return redirect()->route('team.index')->with('success', 'Xóa truyện thành công');
	}

	// Novel User Read (Page)
	public function NovelRead(Request $request, Novel $novel)
	{
		$status = ['success' => session('success'), 'error' => session('error')];
		// Detail Novel
		$detail = Detail::where('id', $novel->id_detail)->first();
		// Categories
		$categories = NovelCate::where('id_novel', $novel->id)->with('categories:id,name,slug')->get();
		// Vol
		$vol = Vol::where('id_novel', $novel->id)->with('chap:id,id_vol,title,slug,created_at')->get();
		// Views
		$views = ViewNovel::where('id_novel', $novel->id)->first();
		// Check login
		if (auth()->check()) {
			// Lấy id user
			$id_user = auth()->user()->id;
			$follow = Follow::where('id_user', $id_user)->where('id_novel', $novel->id)->first();
		} else {
			$follow = null;
		}
		// Rating
		$rating = $this->RatingController->RatingGet($novel->id);
		$rating_user = $this->RatingController->RatingGetUser($novel->id);
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
		return Inertia::render('Client/Novel/NovelRead', [
			'novel_main' => [
				'novel' => $novel,
				'views' => $views,
				'detail' => $detail,
				'categories' => $categories,
			],
			'vol' => $vol,
			'follow' => [
				'status' => $follow,
				'count' => $follow_count,
			],
			'rating' => [
				'rating_user' => $rating_user,
				'count' => $countRating,
				'total' => $totalRating,
				'average' => $averageRating,
			],
			'comments' => $comments,
			'status' => $status
		]);
	}

	// Novel Follow (Status)
	public function NovelFollow($id)
	{
		// Lấy id user
		$id_user = auth()->user()->id;
		$follow_store = Follow::create([
			'id_user' => $id_user,
			'id_novel' => $id,
		]);

		return redirect()->back()->with('success', 'Theo dõi truyện thành công');
	}

	// Novel UnFollow (Status)
	public function NovelUnFollow($id)
	{
		// Lấy id user
		$id_user = auth()->user()->id;
		$follow_delete = Follow::where('id_user', $id_user)->where('id_novel', $id)->delete();

		return redirect()->back()->with('success', 'Bỏ theo dõi truyện thành công');
	}
	// Ẩn - hiện
	public function SelectPublic(Request $request, Novel $novel)
	{
		Novel::Where('id', $novel->id)->update(['is_publish' => $request->value]);
		return redirect()->back()->with('success', 'Cập nhật trạng thái truyện');
	}
	// Follow (Page)
	public function FollowIndex()
	{
		$id_user = auth()->user()->id;
		$novel = Novel::join('follow', 'novel.id', '=', 'follow.id_novel')
			->where('follow.id_user', $id_user)
			->get();
		return Inertia::render('Client/Novel/NovelFollow', [
			'novel' => $novel,
		]);
	}
	// Danh sách truyện (Page)
	public function NovelList()
	{
		return Inertia::render('Client/Novel/ListNovel', [
			'novels' => $this->NovelGetAllPublic(),
		]);
	}
	// Tình trạng truyện (Status)
	public function StatusPublic(Request $request, Novel $novel)
	{
		Novel::Where('id', $novel->id)->update(['status' => $request->value]);
		return redirect()->back()->with('success', 'Cập nhật tình trạng truyện');
	}
	// Theo dõi nhiều
	public function TheoDoiNhieu()
	{
		$novels = Novel::withCount('follow') // Đếm số lượng follows
			->orderBy('follow_count', 'desc')
			->limit(3)
			->get();
		return $novels;
	}

	// Truyện Đã Hoàn Thành 
	public function CompleteNovels()
	{
		$novels = Novel::where('status', 2)->get();
		return $novels;
	}
}