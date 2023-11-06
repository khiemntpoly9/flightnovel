<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\NotifyNovel;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
	// 
	public function index()
	{
		// 
		$user = User::find(2);
		$novel['name_novel'] = 'test name';
		$novel['name_chap'] = 'test chap';

		$user->notify(new NotifyNovel($novel));

		dd('done');
	}
}
