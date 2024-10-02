<?php

namespace App\Interfaces;

interface GroupeDiscutionInterface
{
    public function send_g_m(array $data, $if_fille);
    public function delete_g_m($id);
    public function show_g_m($groupId);
}
