<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function groupeMember()
    {
        return $this->hasMany(GroupeMember::class);
    }

    public function otherGroupeMember()
    {
        return $this->hasMany(OtherGroupeMember::class);
    }
}
