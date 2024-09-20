<?php

namespace App\Http\Controllers;

use App\Http\Requests\OtherGroupeMemberRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\OtherGroupeMemberInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OtherGroupeMembeController extends Controller
{
    private OtherGroupeMemberInterface $otherGroupeMemberInterface;
    public function __construct(OtherGroupeMemberInterface $otherGroupeMemberInterface)
    {
        $this->otherGroupeMemberInterface = $otherGroupeMemberInterface;
    }

    public function addOtherMember(OtherGroupeMemberRequest $otherGroupeMemberRequest, string $groupeId, string $userId, string $url)
    {
        $data = [
            'email' => $otherGroupeMemberRequest->email,
            'groupe_id' => $groupeId
        ];

        DB::beginTransaction();

        try {
            $groupe = $this->otherGroupeMemberInterface->addOtherMember($data, $userId, $url);

            DB::commit();
            return ApiResponse::sendResponse(true, [new UserResource($groupe)], 'Invitation envoyer.', $groupe ? 200 : 400);
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function deleteOtherMember(string $email)
    {
        $groupe = $this->otherGroupeMemberInterface->deleteOtherMember($email);
    }
}
