<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
		'id_categories',
		'id_vol',
		'id_rate',
		'id_user',
		'id_team',
		'id_detail',
		'created_at',
		'updated_at',
	];

	protected $primaryKey = 'id';
}