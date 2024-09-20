<?php

namespace App\Repositories;
use App\Interfaces\GroupeDiscutionInterface;
use App\Models\GroupeDiscution;

class GroupeDiscutionIRepository implements GroupeDiscutionInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function send_g_m(array $data)
    {
        return GroupeDiscution::create($data);
    }
    public function delete_g_m($id)
    {
        return GroupeDiscution::find($id);
    }

    public function show_g_m()
    {
        return GroupeDiscution::all();
    }
}
