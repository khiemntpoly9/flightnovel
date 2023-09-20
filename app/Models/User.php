<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	// Khai báo các cột trong database
	protected $fillable = [
		'name',
		'email',
		'password',
	];

	// Ẩn - Không muốn hiển thị các cột này
	protected $hidden = [
		'password',
		'remember_token',
	];

	// Chỉ định kiểu dữ liệu cho các cột
	protected $casts = [
		'email_verified_at' => 'datetime',
		'password' => 'hashed',
	];

	// Khai báo mối quan hệ với bảng role
	public function role(): BelongsTo
	{
		return $this->belongsTo(Role::class, 'id_role', 'id_role');
	}
}