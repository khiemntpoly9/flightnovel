<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoryRead extends Model
{
	use HasFactory;

	protected $table = 'history_read';
	protected $fillable = [
		'id',
		'id_user',
		'id_novel',
		'created_at',
	];

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class, 'id_user', 'id');
	}

	public function novel(): BelongsTo
	{
		return $this->belongsTo(Novel::class, 'id_novel', 'id');
	}
}
