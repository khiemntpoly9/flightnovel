<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $fillable = [
        'id_categories',
        'name',
    ];
    protected $primaryKey = 'id_categories';
    public $timestamps = false;
}