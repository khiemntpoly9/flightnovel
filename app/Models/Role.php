<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    // Tên bảng trong database
    protected $table = 'role';

    // Khai báo các cột trong database
    protected $fillable = [
        'id_role',
        'name_role',
        'short_role'
    ];

    // Không sử dụng các cột updated_at và created_at
    public $timestamps = false;

    // Khai báo mối quan hệ với bảng user
    public function user(): HasMany
    {
        return $this->hasMany(User::class, 'id_role');
    }
}