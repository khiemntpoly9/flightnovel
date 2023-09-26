<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NovelController extends Controller
{
	public function NovelIndex()
	{
		return Inertia::render('Client/Novel/Novel');
	}
}