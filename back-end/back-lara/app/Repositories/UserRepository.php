<?php

namespace App\Repositories;

use App\Interfaces\UserInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;

class UserRepository implements UserInterface
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function update($request, string $id)
    {
        try {
            $user = User::findOrFail($id);

            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image si elle existe
                if ($user->image && Storage::exists('public/storage/profil_images/' . $user->image)) {
                    Storage::delete('public/storage/profil_images/' . $user->image);
                }

                // Enregistrer la nouvelle image
                $imagePath = $request->file('image')->store('public/storage/profil_images/');
                $imageName = basename($imagePath); // Récupérer le nom du fichier
                $user->image = $imageName; // Assigner le nom de l'image à l'utilisateur
            }

        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException('Publication non trouvé');
        }

        // Mettre à jour les autres champs
        $user->username = $request->input('username');
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->email = $request->input('email');

        // Enregistrer les modifications
        $user->save();

        return $user;
    }

    public function delete(string $id)
    {
        return User::find($id);
    }

    public function index()
    {
        return User::all();
    }

    public function show(string $id)
    {
        return User::find($id);
    }
}
