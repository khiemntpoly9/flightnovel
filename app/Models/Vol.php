<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vol extends Model
{
    use HasFactory;
    protected $table = 'vol';
    protected $fillable = [
        'id_vol',
        'id_chap',
        'title',
        'created_at',
        'updated_at',
    ];
}