<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ViewNovel extends Model
{
	use HasFactory;

	protected $table = 'view_novel';

	protected $fillable = [
		'id',
		'id_novel',
		'views',
		'daily_views',
		'weekly_views',
		'monthly_views',
	];

	protected $primaryKey = 'id';
	public $timestamps = false;

	public function novel(): BelongsTo
	{
		return $this->belongsTo(Novel::class, 'id_novel', 'id');
	}
}
