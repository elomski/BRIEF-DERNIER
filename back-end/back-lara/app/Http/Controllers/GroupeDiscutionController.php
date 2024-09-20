<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupeDiscutionRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\GroupeDiscutionInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupeDiscutionController extends Controller
{
    private GroupeDiscutionInterface $groupeDiscutionInterface;
    public function __construct(GroupeDiscutionInterface $groupeDiscutionInterface)
    {
        $this->groupeDiscutionInterface = $groupeDiscutionInterface;
    }

    public function send_g_m(GroupeDiscutionRequest $groupeDiscutionRequest, $userId, $groupeId)
    {
        $filePath = null;

        if ($groupeDiscutionRequest->hasFile('file')) {

            $file = $groupeDiscutionRequest->file('file');
            $fileName = time() . '.' . $file->getClientOriginalExtension(); // Nom unique pour le fichier
            $filePath = $file->storeAs('files', $fileName, 'public'); // Stockage de le fichier dans 'public/files'

        }

        $message = [
            'user_id' => $userId,
            'groupe_id' => $groupeId,
            'message' => $groupeDiscutionRequest->message,
            'file' => $filePath
        ];
        DB::beginTransaction();

        try {
            $groupeDiscution = $this->groupeDiscutionInterface->send_g_m($message);
            DB::commit();

            return ApiResponse::sendResponse(
                true, 
                [new UserResource(resource: $groupeDiscution)], 
                'Opération effectuée.'
            );
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return $th;
            return ApiResponse::rollback($th);
        }

    }

    public function show_g_m()
    {
        $groupeMessages = $this->groupeDiscutionInterface->show_g_m();

        return ApiResponse::sendResponse(true, UserResource::collection($groupeMessages), 'Opération effectuée.');
    }

    public function delete_g_m(string $id)
    {
        $groupeMessage = $this->groupeDiscutionInterface->delete_g_m($id);

        $groupeMessage->delete();

        return ApiResponse::sendResponse(true, [], 'Opération effectuée.');
    }
}
