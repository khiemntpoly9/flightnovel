<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
	use HasFactory;
	protected $table = 'categories';
	protected $fillable = [
		'id',
		'name',
		'slug'
	];
	protected $primaryKey = 'id';
	public $timestamps = false;
	public function getRouteKeyName(): string
	{
		return 'slug';
	}
}