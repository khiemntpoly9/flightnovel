<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;
use Laravel\Scout\Attributes\SearchUsingPrefix;
use Laravel\Scout\Attributes\SearchUsingFullText;

class Novel extends Model
{
	use HasFactory, Searchable;
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

	public function novelcate(): BelongsTo
	{
		return $this->belongsTo(NovelCate::class, 'id', 'id_novel');
	}

	public function getRouteKeyName(): string
	{
		return 'slug';
	}

	#[SearchUsingPrefix(['name_novel', 'author', 'illustrator'])]
	// #[SearchUsingFullText(['name_novel', 'author', 'illustrator'])]
	public function toSearchableArray(): array
	{
		return [
			'name_novel' => $this->name_novel,
			'slug' => $this->slug,
			'author' => $this->author,
			'illustrator' => $this->illustrator,
		];
	}
}