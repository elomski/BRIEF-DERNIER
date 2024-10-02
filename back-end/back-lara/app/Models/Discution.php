<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discution extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'message',
        'file',
        'user_id2',
        'file_name',
        'file_size',
        'file_type',
    ];

    public function users()
    {
        $this->belongsTo(User::class);
    }
}
