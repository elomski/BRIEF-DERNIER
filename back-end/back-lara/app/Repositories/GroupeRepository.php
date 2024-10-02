<?php

namespace App\Repositories;

use App\Interfaces\GroupeInterface;
use App\Models\Groupe;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GroupeRepository implements GroupeInterface
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function index()
    {
        return Groupe::all();
    }
    
    public function create(array $data)
    {
        return Groupe::create($data);
    }

    public function show(string $id) 
    {
        return Groupe::find($id);
    }

    public function showOne(string $id) 
    {
        return Groupe::find($id);
    }

    public function showForUser(string $id) 
    {
        return Groupe::find($id);
    }

    public function showAllForUser(string $id) 
    {
        $groupes = [];

        $groupe_id = DB::table('groupe_members')
                        ->where('user_id'
                        , $id)->pluck('groupe_id');


        // $userAndGroupe = DB::table('groupe_members')
        //                 ->where('user_id', $id);

        foreach ($groupe_id as $id) {
            array_push($groupes, Groupe::find($id));
        }

        return $groupes;
    }
    public function update($groupeRequest, $id)
    {
        try {
            $groupe = Groupe::findOrFail($id);

            // if ($groupeRequest->hasFile('image')) {
            //     // Supprimer l'ancienne image si elle existe
            //     if ($groupe->image && Storage::exists('public/storage/groupe_profil_images/' . $groupe->image)) {
            //         Storage::delete('public/storage/groupe_profil_images/' . $groupe->image);
            //     }

            //     // Enregistrer la nouvelle image
            //     $imagePath = $groupeRequest->file('image')->store('public/storage/groupe_profil_images/');
            //     $imageName = basename($imagePath); // Récupérer le nom du fichier
            //     $groupe->image = $imageName; // Assigner le nom de l'image à l'utilisateur
            // }

            // Mettre à jour les autres champs
            $groupe->name = $groupeRequest->input('name');
            $groupe->description = $groupeRequest->input('description');

            // Enregistrer les modifications
            $groupe->save();

        } catch (ModelNotFoundException $e) {
            throw new ModelNotFoundException('Publication non trouvé');
        }

        return $groupe;
    }
    public function delete($id) 
    {
        $groupe = Groupe::findOrFail($id);
        $groupe->delete();
    }
}
