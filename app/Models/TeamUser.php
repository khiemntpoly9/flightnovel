<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamUser extends Model
{
	use HasFactory;

	protected $table = 'team_user';

	protected $fillable = [
		'id',
		'id_user',
		'id_team',
		'team_role',
		'created_at',
		'updated_at',
	];

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class, 'id_user', 'id');
	}

	public function team(): BelongsTo
	{
		return $this->belongsTo(Team::class, 'id_team', 'id_team');
	}
}