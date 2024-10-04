<?php

namespace App\Interfaces;

interface OtherGroupeMemberInterface
{
    public function addOtherMember(array $data, string $id);
    public function deleteOtherMember(string $email);
}
