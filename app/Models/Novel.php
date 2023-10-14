<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Novel extends Model
{
	use HasFactory;
	protected $table = 'novel';
	protected $fillable = [
		'id',
		'name_novel',
		'thumbnail',
		'author',
		'illustrator',
		'views',
		'status',
		'slug',
		'is_publish',
		'id_rate',
		'id_team',
		'id_detail',
		'id_user',
		'created_at',
		'updated_at',
	];

	protected $primaryKey = 'id';

	public function follow(): BelongsTo
	{
		return $this->belongsTo(Follow::class, 'id_novel', 'id');
	}

	public function getRouteKeyName(): string
	{
		return 'slug';
	}
}