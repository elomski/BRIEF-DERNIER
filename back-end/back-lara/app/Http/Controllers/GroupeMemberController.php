<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Interfaces\GroupeMemberInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupeMemberController extends Controller
{
    private GroupeMemberInterface $groupeMemberInterface;
    public function __construct(GroupeMemberInterface $groupeMemberInterface)
    {
        $this->groupeMemberInterface = $groupeMemberInterface;
    }

    public function addMember($userId, $groupeId)
    {
        $add = [
            'user_id' => $userId,
            'groupe_id' => $groupeId,
        ];
        DB::beginTransaction();

        try {
            $user = $this->groupeMemberInterface->addMember($add);
            DB::commit();

            if ($user)
                return ApiResponse::sendResponse(
                    true,
                    [new UserResource($user)],
                    'Opération effectuée.'
                );
            else
                return ApiResponse::sendResponse(
                    false,
                    [],
                    'Déjà membre du groupe.'
                );
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function ejecteMember(string $userId, string $groupeId)
    {
        $user = $this->groupeMemberInterface->ejecteMember($userId, $groupeId);

        if (!$user)
            return ApiResponse::sendResponse(false, [], 'Utilisateur introuvable.', $user ? 200 : 400);
        else {
            $user->delete();
            return ApiResponse::sendResponse(true, [], 'Utilisateur retiré.', $user ? 200 : 400);
        }
    }
}
