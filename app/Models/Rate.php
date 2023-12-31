<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
	use HasFactory;
	protected $table = 'rate';
	protected $fillable = [
		'id',
		'id_user',
		'comment',
		'point',
		'created_at',
		'updated_at',
	];

	protected $primaryKey = 'id';
}