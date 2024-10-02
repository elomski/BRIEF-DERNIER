<?php

namespace App\Repositories;
use App\Interfaces\GroupeDiscutionInterface;
use App\Models\GroupeDiscution;
use App\Models\User;

class GroupeDiscutionIRepository implements GroupeDiscutionInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function send_g_m(array $data, $if_fille)
    {

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = json_encode($value); // Convertit le tableau en JSON
            }
        }

        // $user1 = User::find($data['user_id']);
        // $user2 = User::find($data['user_id2']);
        // $email = User::where('id', $data['user_id'])->

        // if ($if_fille) {
        //     Mail::to($user2->email)->send(
        //         new FileSendEmail(
        //             $user2->last_name,
        //             $user1->last_name,
        //             'Une petite erreur'
        //         )
        //     );
        // }
        
        // return Discution::create($data);

        return GroupeDiscution::create($data);
    }
    public function delete_g_m($id)
    {
        return GroupeDiscution::find($id);
    }

    public function show_g_m($groupId)
    {
        return GroupeDiscution::where('groupe_id', $groupId)->get();
    }
}
