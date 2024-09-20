<?php

namespace App\Repositories;
use App\Interfaces\DiscutionInterface;
use App\Models\Discution;

class DiscutionRepository implements DiscutionInterface
{
    /**
     * Create a new class instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function send_m(array $data)
    {
        return Discution::create($data);
    }

    public function show_m()
    {
        return Discution::all();
    }

    public function delete_m(string $id)
    {
        return Discution::find($id);
    }
}
