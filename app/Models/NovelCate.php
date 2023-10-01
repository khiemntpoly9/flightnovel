<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NovelCate extends Model
{
	use HasFactory;

	protected $table = 'novel_cate';

	protected $fillable = [
		'id_novel',
		'id_categories',
	];

	public $timestamps = false;

	public function novel()
	{
		return $this->belongsTo(Novel::class, 'id_novel', 'id_novel');
	}

	public function categories()
	{
		return $this->belongsTo(Categories::class, 'id_categories', 'id_categories');
	}
}