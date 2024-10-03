<?php

namespace App\Repositories;

use App\Interfaces\GroupeMemberInterface;
use App\Mail\AllNotification;
use App\Models\Groupe;
use App\Models\GroupeMember;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Metadata\Uses;

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
        $emailMessage = 'null';
        $userData = null;
        $groupeMembers = GroupeMember::where('groupe_id', $data['groupe_id'])->pluck('user_id');
        $user = GroupeMember::where('user_id', $data['user_id'])
            ->where('groupe_id', $data['groupe_id'])
            ->exists();
        $groupe = Groupe::find($data['groupe_id']);

        if ($user)
            return false;
        else {
            // $index = 0;
            $email = [];
            $emailMessage = 'Le groupe s\'agrandit !!! Vous avez un nouveau membre dans le groupe ' . $groupe->name;
            // $emailMessage = '1234';
            foreach ($groupeMembers as $groupeMember) {

                $userData = User::where('id', $groupeMember)->first();
                $email = $userData->email;
                // $index++;
                Mail::to($email)->send(
                    new AllNotification(
                        $userData->last_name,
                        $emailMessage,
                    )
                );
            }
        }

        $create = GroupeMember::create($data);

        // return [
        //     // 'user' => $email,
        //     'test1' => $groupeMembers,
        //     'test2' => $userData
        // ];

        return $create;
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
