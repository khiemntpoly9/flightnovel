<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comment';
    protected $fillable = ['id', 'id_novel', 'id_user', 'content', 'parent_id', 'created_at', 'updated_at'];
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