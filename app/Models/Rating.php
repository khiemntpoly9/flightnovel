<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
	use HasFactory;

	protected $table = 'rating';
	protected $fillable = ['id', 'id_novel', 'id_user', 'rating', 'created_at', 'updated_at'];
	protected $primaryKey = 'id';
	public function novel()
	{
		return $this->belongsTo(Novel::class, 'id_novel', 'id');
	}
	public function user()
	{
		return $this->belongsTo(User::class, 'id_user', 'id');
	}
}
