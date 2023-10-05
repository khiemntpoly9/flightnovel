<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;
    protected $table = 'follow';
    protected $fillable = [
        'id',
        'id_user',
        'id_novel',
        'created_at',
        'updated_at',
    ];

    protected $primaryKey = 'id';
}