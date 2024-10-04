<?php

namespace App\Repositories;
use App\Interfaces\OtherGroupeMemberInterface;
use App\Mail\OtherGroupeMemberMail;
use App\Mail\OtpCodeEmail;
use App\Models\Groupe;
use App\Models\OtherGroupeMember;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class OtherGroupeMembeRepository implements OtherGroupeMemberInterface
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function addOtherMember(array $data, string $id)
    {
        $otherUser = OtherGroupeMember::create($data);
        $url =  "http://localhost:5173/register";
        $user = User::where('id', $id)->first();
        $name = $user->first_name;

        $groupe = Groupe::where('id', $data['groupe_id'])->first();
        $groupe_name = $groupe->name;
        
        // $user = User::with('categorie')->find($id);

        Mail::to($data['email'])->send(
            new OtherGroupeMemberMail(
                $name,
                $groupe_name,
                $url
            )
        );

        return $groupes = [
            'groupe' => $otherUser,
            'url' => $url,
            'user' => $name,
            'groupe_name' => $groupe_name
        ];
    }

    public function deleteOtherMember(string $email)
    {
        $groupe = OtherGroupeMember::where('email', $email)->first();
    }
}
