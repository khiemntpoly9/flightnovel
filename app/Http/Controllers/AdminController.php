<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Novel;
use App\Models\User;
use App\Models\ViewNovel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Khai báo biến
    protected $ViewsController;
    // Khởi tạo
    public function __construct(ViewsController $ViewsController)
    {
        $this->ViewsController = $ViewsController;
    }
    public function Dashboard()
    {
        $novel = Novel::all()->count();

        $user = User::all()->count();



        return Inertia::render('Admin/AdminMain', [

            'data' => [$novel, $user],
            'views' => [
                $this->ViewsController->DayView(),
                $this->ViewsController->DayWeek(),
                $this->ViewsController->DayMonth()
            ]
        ]);
    }
}
