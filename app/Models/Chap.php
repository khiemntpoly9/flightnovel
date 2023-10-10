<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chap extends Model
{
	use HasFactory;
	protected $table = 'chap';
	protected $fillable = [
		'id',
		'id_vol',
		'title',
		'content',
		'slug',
		'created_at',
		'updated_at',
	];
	protected $primaryKey = 'id';
	public function vol(): BelongsTo
	{
		return $this->belongsTo(Vol::class, 'id_vol', 'id');
	}
}