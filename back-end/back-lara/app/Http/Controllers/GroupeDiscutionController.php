<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
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
        $if_fille = false;
        $filePaths = [];
        $fileOriginalName = [];
        $fileOriginalType = [];
        $fileOriginalSize = [];

        if ($groupeDiscutionRequest->hasFile('file')) {

            $files = $groupeDiscutionRequest->file('file');

            $if_fille = true;

            foreach ($files as $file) {
                $fileOriginalName[] = $file->getClientOriginalName();
                $fileOriginalType[] = $file->getClientOriginalExtension();
                $fileOriginalSize[] = $file->getSize();

                $fileName = time() . rand(10000, 99999) . '.' . $file->getClientOriginalExtension(); // Nom unique pour le fichier
                $filePath = $file->storeAs(`/files/`, $fileName, 'public'); // Stockage de le fichier dans 'public/files'
                
                $filePaths[] = `/storage/` . $filePath;
                $fileOriginalType[] = $file->getClientOriginalExtension();
            }
        }

        $message = [
            'user_id' => $userId,
            'groupe_id' => $groupeId,
            'message' => $groupeDiscutionRequest->message,
            'file' => $filePaths,
            'file_type' => $fileOriginalType,
            'file_size' => $fileOriginalSize,
            'file_name' => $fileOriginalName,
        ];

        DB::beginTransaction();

        try {
            $groupeDiscution = $this->groupeDiscutionInterface->send_g_m($message, $if_fille);
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

    public function show_g_m(string $groupId)
    {
        $groupeMessages = $this->groupeDiscutionInterface->show_g_m($groupId);

        return ApiResponse::sendResponse(true, $groupeMessages, 'Opération effectuée.');
    }

    public function delete_g_m(string $id)
    {
        $groupeMessage = $this->groupeDiscutionInterface->delete_g_m($id);

        $groupeMessage->delete();

        return ApiResponse::sendResponse(true, [], 'Opération effectuée.');
    }
}
