<?php

namespace App\Repositories;
use App\Interfaces\GroupeMemberInterface;
use App\Models\GroupeMember;

class GroupeMemberRepository implements GroupeMemberInterface
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function addMember(array $data)
    {
        return GroupeMember::create($data);
    }

    public function ejecteMember(string $id, string $groupeId)
    {
        $user = GroupeMember::where('user_id', $id)
                            ->where('groupe_id', $groupeId)
                            ->first();
        if (!$user)
            return false;
        else
            return $user;
    }
}
