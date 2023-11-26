<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
	// Khai báo biến
	protected $NovelController;
	// Khởi tạo
	public function __construct(NovelController $NovelController)
	{
		$this->NovelController = $NovelController;
	}
	// Page chap mới nhất
	public function PageChapNew()
	{
		return Inertia::render('Client/Novel/ChapterNew', [
			'novelsNewChap' => $this->NovelController->NovelGetChapNew(),
		]);
	}
	// Page novel theo category
	public function PageNovelForCate(Categories $cate)
	{
		return Inertia::render('Client/Novel/NovelForCate', [
			'novels' => $this->NovelController->NovelGetCate($cate->slug),
			'category' => $cate,
		]);
	}
}
