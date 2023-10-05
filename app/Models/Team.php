<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Team extends Model
{
	use HasFactory;

	protected $table = 'team';

	protected $fillable = [
		'id',
		'team_name',
		'team_detail',
		'created_at',
		'updated_at',
	];

	protected $primaryKey = 'id';
}