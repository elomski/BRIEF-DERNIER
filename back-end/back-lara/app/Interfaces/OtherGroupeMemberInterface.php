<?php

namespace App\Interfaces;

interface OtherGroupeMemberInterface
{
    public function addOtherMember(array $data, string $id, string $url);
    public function deleteOtherMember(string $email);
}
