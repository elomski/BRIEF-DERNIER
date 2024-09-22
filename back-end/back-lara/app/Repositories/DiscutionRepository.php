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
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = json_encode($value); // Convertit le tableau en JSON
            }
        }

        return Discution::create($data);
    }

    public function show_m($id1, $id2)
    {
        return Discution::where('user_id', $id1)
                            ->where('user_id2', $id2)->get();
    }

    public function delete_m(string $id)
    {
        return Discution::find($id);
    }
}
