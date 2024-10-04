<?php

namespace App\Repositories;

use App\Interfaces\GroupeDiscutionInterface;
use App\Mail\AllNotification;
use App\Mail\FileSendEmail;
use App\Models\Groupe;
use App\Models\GroupeDiscution;
use App\Models\GroupeMember;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

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
        };

        if ($if_fille) {
            $user = User::find($data['user_id']);
            $groupe_members = GroupeMember::where('groupe_id', $data['groupe_id'])->pluck('user_id');
            $groupe = Groupe::find($data['groupe_id']);
            $last_name1 = $user->last_name;

            $message = $last_name1 . ' Vous a ajouter des fichier dans le groupe ' . $groupe->name . '.'
                . 'Les fichiers ont au totale une taille de ' . $data['file_size'] . ' Mo (type ' . $data['file_type'] . ').' . ' Merci de consulter le groupe.';
            
            foreach ($groupe_members as $groupeMember) {
                
                $userData = User::where('id', $groupeMember)->first();
                $email = $userData->email;
                Mail::to($email)->send(
                    new AllNotification(
                        $userData->last_name,
                        $message,
                    )
                );
            };
        }

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
