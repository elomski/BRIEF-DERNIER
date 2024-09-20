<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupeMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'groupe_id',
    ];

    public function users()
    {
        $this->belongsTo(User::class);
    }

    public function groupes()
    {
        $this->belongsTo(Groupe::class);
    }
}
