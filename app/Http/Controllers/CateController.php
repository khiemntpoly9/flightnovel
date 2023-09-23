<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CateController extends Controller
{
	public function CateIndex()
	{
		// Lấy tất cả dữ liệu từ bảng categories
		$categories = Categories::all();
		return Inertia::render('Admin/Categories/Categories', [
			'categories' => $categories,
		]);
	}

	public function CateStore(Request $request)
	{
		// Kiểm tra dữ liệu đầu vào
		$request->validate([
			'name' => ['required', 'string', 'max:255'],
		], [
			'name.required' => 'Tên danh mục không được để trống',
			'name.max' => 'Tên danh mục không được quá 255 ký tự',
		]);

		// Lưu dữ liệu vào bảng categories
		Categories::create([
			'name' => $request->name,
		]);

		$categories = Categories::all();

		// Chuyển hướng về trang categories
		return Inertia::render('Admin/Categories/Categories', [
			'successMessage' => 'Tạo thể loại thành công',
			'categories' => $categories,
		]);
	}

	public function CateDetail(Request $request, $id)
	{
		// Lấy dữ liệu từ bảng categories theo id
		$category = Categories::find($request->id);
		// Trả về dữ liệu dạng json
		return Inertia::render('Admin/Categories/CategoriesEdit', [
			'category' => $category,
		]);
	}

	public function CateUpdate(Request $request)
	{

		// dd($request->all());
		// Kiểm tra dữ liệu đầu vào
		$request->validate([
			'name' => ['required', 'string', 'max:255'],
		], [
			'name.required' => 'Tên danh mục không được để trống',
			'name.max' => 'Tên danh mục không được quá 255 ký tự',
		]);

		// Lưu dữ liệu vào bảng categories
		Categories::where('id_categories', $request->id_categories)->update([
			'name' => $request->name,
		]);

		$categories = Categories::all();

		// Chuyển hướng về trang categories
		return Inertia::render('Admin/Categories/Categories', [
			'successMessage' => 'Cập nhật thể loại thành công',
			'categories' => $categories,
		]);
	}

	public function CateDelete(Request $request, $id)
	{
		// Lấy dữ liệu từ bảng categories theo id
		$category = Categories::find($id);
		// Xóa dữ liệu
		$category->delete();
		// Lấy lại dữ liệu từ bảng categories
		$categories = Categories::all();

		return Inertia::render('Admin/Categories/Categories', [
			'categories' => $categories,
			'successMessage' => 'Xóa thể loại thành công',
		]);
	}
}