<?php

namespace App\Interfaces;

interface DiscutionInterface
{
    public function send_m(array $data);
    public function delete_m(string $id);
    public function show_m($id1, $id2);
}
