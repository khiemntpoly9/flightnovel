<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Novel;
use App\Models\Vol;
use Illuminate\Http\Request;
use App\Models\Chap;
use Inertia\Inertia;

class PreNextController extends Controller
{
    //
    public function Next(Request $request, $novel, $vol, Chap $chap)
    {

        dd($request);
        // Lấy chap hiện tại
        $currentChapter = Chap::where('slug', $request)->firstOrFail();

        // Lấy vol hiện tại
        $currentVol = Vol::where('slug', $request)->firstOrFail();

        // Lấy novel hiện tại
        $currentNovel = Novel::where('slug', $request)->firstOrFail();

        dd($currentChapter, $currentNovel, $currentVol);


        $step = 3; // Số lượng trang bạn muốn hiển thị xung quanh trang hiện tại

        // Tính toán trang bắt đầu và kết thúc
        $startPage = max(1, $currentChapter->id - $step);
        $endPage = min($currentVol->chapters->count(), $currentChapter->id + $step);

        // Đảm bảo rằng luôn có 'step * 2 + 1' trang được hiển thị
        while ($endPage - $startPage < $step * 2 && $endPage < $currentVol->chapters->count()) {
            $endPage++;
        }

        while ($endPage - $startPage < $step * 2 && $startPage > 1) {
            $startPage--;
        }

        // Truy vấn cơ sở dữ liệu để lấy danh sách các trang cần hiển thị
        $pages = $currentVol->chapters()
            ->whereBetween('id', [$startPage, $endPage])
            ->orderBy('id')
            ->get();


        return Inertia::render('Client/Novel/Chapter', compact('pages'));
        // dd($chap);
    }
    public function Pre(Request $request, $novel, $vol, Chap $chap)
    {
        dd($chap);
    }
}
