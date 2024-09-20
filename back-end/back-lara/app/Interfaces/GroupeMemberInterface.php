<?php

namespace App\Interfaces;

interface GroupeMemberInterface
{
    public function addMember(array $data);
    public function ejecteMember(string $id, string $groupeId);
}
