<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Detail;
use App\Models\Follow;
use App\Models\Novel;
use App\Models\NovelCate;
use App\Models\TeamUser;
use App\Models\Vol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NovelController extends Controller
{
	public function NovelIndex()
	{
		// Lấy categories
		$categories = Categories::all();
		return Inertia::render('Client/Novel/Novel', [
			'categories' => $categories,
		]);
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
		]);
		// Upload ảnh
		$path = Storage::disk('digitalocean')->put('novel', $request->file('thumbnail'), 'public');
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

	// Novel Update Pape
	public function NovelUpdatePage($novel)
	{
		// Lấy id novel
		$novel = Novel::where('slug', $novel)->first();
		// Lấy categories
		$categories = Categories::all();
		$detail = Detail::find($novel->id_detail);
		$details = $detail;

		return Inertia::render('Client/Novel/NovelUpdate', [
			'categories' => $categories,
			'detail' => $details,
			'novel' => $novel
		]);
	}

	// Sửa truyện
	public function NovelUpdate(Request $request, $novel)
	{
		dd($request->all());
		// Validate
		$request->validate([
			'name_novel' => ['required', 'string', 'max:255', 'min:5'],
			'thumbnail' => ['image', 'mimes:png,jpg', 'max:3000'],
			'author' => ['required', 'string', 'max:255'],
			'illustrator' => ['required', 'string', 'max:255'],
			'categories' => ['required'],
			'summary' => ['required'],
		], [
			'name_novel.required' => 'Tên truyện không được để trống',
			'name_novel.string' => 'Tên truyện phải là chuỗi',
			'name_novel.max' => 'Tên truyện không được quá 255 ký tự',
			'name_novel.min' => 'Tên truyện không được dưới 5 ký tự',
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

		// Upload ảnh
		$path = Storage::disk('digitalocean')->put('novel', $request->file('thumbnail'), 'public');

		// Sửa novel
		Novel::where('slug', $novel->slug)->update([
			'name_novel' => $request->name_novel,
			'thumbnail' => 'https://flightnovel.sgp1.digitaloceanspaces.com/' . $path,
			'author' => $request->author,
			'illustrator' => $request->illustrator,
			'id_user' => auth()->user()->id,
		]);

		// Sửa dữ liệu bảng detail
		$detail = Detail::where('id', $novel->id_detail)->update([
			'summary' => $request->summary,
			'note' => $request->note,
		]);

		// Sửa truyện vào bảng novel_cate
		$categoryIds = explode(',', $request->categories);

		foreach ($categoryIds as $cateId) {
			// Lấy id của tiểu thuyết và id của thể loại từ form hoặc từ dữ liệu hiện có
			$id_novel = $novel->id; //  lấy từ dữ liệu tiểu thuyết
			$id_categories = $cateId; //  lấy từ biến vòng lặp $categoryIds

			// Tạo đối tượng NovelCate
			$novelCate = new NovelCate();
			$novelCate->id_novel = $id_novel;
			$novelCate->id_categories = $id_categories;

			// Cập nhật hoặc tạo mới bản ghi trong bảng NovelCate
			$novelCate->update();
		}
		return redirect()->route('team.index')->with('success', 'Sửa truyện thành công');
	}

	// Admin Novel
	public function NovelAdmin()
	{
		$novels = Novel::all();
		return Inertia::render('Admin/Novel/Novel', ['novels' => $novels]);
	}

	// Novel User Read
	public function NovelRead(Request $request, Novel $novel)
	{
		$status = ['success' => session('success'), 'error' => session('error')];
		$vol = Vol::where('id_novel', $novel->id)->with('chap:id,id_vol,title,slug,created_at')->get();
		// Check login
		if (auth()->check()) {
			// Lấy id user
			$id_user = auth()->user()->id;
			$follow = Follow::where('id_user', $id_user)->where('id_novel', $novel->id)->first();
		} else {
			$follow = null;
		}
		// Lấy số lượng follow
		$follow_count = Follow::where('id_novel', $novel->id)->count();
		return Inertia::render('Client/Novel/NovelRead', [
			'novel' => $novel,
			'vol' => $vol,
			'follow' => [
				'status' => $follow,
				'count' => $follow_count,
			],
			'status' => $status
		]);
	}

	// Novel Follow
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

	// Novel UnFollow
	public function NovelUnFollow($id)
	{
		// Lấy id user
		$id_user = auth()->user()->id;
		$follow_delete = Follow::where('id_user', $id_user)->where('id_novel', $id)->delete();

		return redirect()->back()->with('success', 'Bỏ theo dõi truyện thành công');
	}
}
