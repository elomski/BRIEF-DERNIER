<?php

namespace App\Interfaces;

interface GroupeInterface
{
    public function index();
    public function create(array $data);
    public function show(string $id);
    public function update($groupeRequest, $id);
    public function delete($id);
}
