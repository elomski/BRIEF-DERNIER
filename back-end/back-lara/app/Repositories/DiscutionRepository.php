<?php

namespace App\Repositories;

use App\Interfaces\DiscutionInterface;
use App\Mail\FileSendEmail;
use App\Models\Discution;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DiscutionRepository implements DiscutionInterface
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function send_m(array $data, $if_fille)
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = json_encode($value); // Convertit le tableau en JSON
            }
        }

        $user1 = User::find($data['user_id']);
        $user2 = User::find($data['user_id2']);
        // $email = User::where('id', $data['user_id'])->

        if ($if_fille) {
            Mail::to($user2->email)->send(
                new FileSendEmail(
                    $user2->last_name,
                    $user1->last_name,
                    'Une petite erreur'
                )
            );
        }
        
        return Discution::create($data);
    }

    public function show_m($id1, $id2)
    {

        $messages = DB::table('discutions')
                ->where('user_id', $id1)
                ->where('user_id2', $id2)
                ->union(
                    DB::table('discutions')
                        ->where('user_id', $id2)
                        ->where('user_id2', $id1)
                )->distinct()->orderBy('created_at', 'asc')->get();

        // --------------------------------------
        // return Discution::where(function ($query) use ($id1, $id2) {
        //     $query->where('user_id', $id1)
        //         ->where('user_id2', $id2);
        // })->orWhere(function ($query) use ($id1, $id2) {
        //     $query->where('user_id', $id2)
        //         ->where('user_id2', $id1);
        // });

        // --------------------------------------
        // $message1 = Discution::where('user_id', $id1)
        //                     ->where('user_id2', $id2)->get();

        // $message2 = Discution::where('user_id', $id2)
        //                     ->where('user_id2', $id1)->get();

        // $messages = $message1->union($message2)->get();
        return $messages;
    }

    public function delete_m(string $id)
    {
        return Discution::find($id);
    }
}
