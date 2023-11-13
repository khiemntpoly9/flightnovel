<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chap;

class PreNextController extends Controller
{
    //
    public function Next(Request $request, $novel, $vol, Chap $chap)
    {
        dd($chap);
    }
    public function Pre(Request $request, $novel, $vol, Chap $chap)
    {
        dd($chap);
    }
}
