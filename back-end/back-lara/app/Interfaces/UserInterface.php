<?php

namespace App\Interfaces;

interface UserInterface
{
    public function update($request, string $id);
    public function delete(string $id);
    public function index();
    public function show(string $id);
}
