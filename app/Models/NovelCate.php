<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NovelCate extends Model
{
	use HasFactory;

	protected $table = 'novel_cate';

	protected $fillable = [
		'id_novel',
		'id_categories',
	];

	public $timestamps = false;

	public function novel(): BelongsTo
	{
		return $this->belongsTo(Novel::class, 'id_novel', 'id');
	}

	public function categories(): BelongsTo
	{
		return $this->belongsTo(Categories::class, 'id_categories', 'id');
	}
}