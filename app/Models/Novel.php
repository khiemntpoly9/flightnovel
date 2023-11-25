<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;
use Laravel\Scout\Attributes\SearchUsingPrefix;

// use Laravel\Scout\Attributes\SearchUsingFullText;

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
		'id_user',
		'summary',
		'note',
		'another_name',
		'created_at',
		'updated_at',
	];

	protected $primaryKey = 'id';

	public function follow(): BelongsTo
	{
		return $this->belongsTo(Follow::class, 'id', 'id_novel');
	}

	public function novelcate(): BelongsTo
	{
		return $this->belongsTo(NovelCate::class, 'id', 'id_novel');
	}

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class, 'id_team', 'id');
	}

	public function vol(): HasMany
	{
		return $this->hasMany(Vol::class, 'id_novel', 'id');
	}
	public function view(): HasOne
	{
		return $this->HasOne(ViewNovel::class, 'id_novel');
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