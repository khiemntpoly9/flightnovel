<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vol extends Model
{
	use HasFactory;
	protected $table = 'vol';
	protected $fillable = [
		'id',
		'id_novel',
		'title',
		'slug',
		'created_at',
		'updated_at',
	];
	protected $primaryKey = 'id';
	public function novel(): BelongsTo
	{
		return $this->belongsTo(Novel::class, 'id_novel', 'id');
	}
	public function chap(): HasMany
	{
		return $this->hasMany(Chap::class, 'id_vol', 'id');
	}
}