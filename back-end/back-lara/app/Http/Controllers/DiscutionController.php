<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiscutionRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\DiscutionInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiscutionController extends Controller
{
    private DiscutionInterface $discutionInterface;
    public function __construct(DiscutionInterface $discutionInterface)
    {
        $this->discutionInterface = $discutionInterface;
    }

    public function send_m(DiscutionRequest $discutionRequest, $userId, $userId2)
    {
        $filePaths = [];

        if ($discutionRequest->hasFile('file')) {

            $files = $discutionRequest->file('file');

            foreach ($files as $file) {
                $fileName = time() . rand(10000, 99999) . '.' . $file->getClientOriginalExtension(); // Nom unique pour le fichier
                $filePath = $file->storeAs('files', $fileName, 'public'); // Stockage de le fichier dans 'public/files'
                $filePaths[] = `/storage/` . $filePath;
            }
        }

        $message = [
            'user_id' => $userId,
            'user_id2' => $userId2,
            'message' => $discutionRequest->message,
            'file' => $filePaths
        ];
        DB::beginTransaction();

        try {
            $discution = $this->discutionInterface->send_m($message);
            DB::commit();

            return ApiResponse::sendResponse(
                true,
                [new UserResource(resource: $discution)],
                'Opération effectuée.'
            );
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function show_m($id1, $id2)
    {
        $message = $this->discutionInterface->show_m($id1, $id2);

        if (!$message->isEmpty()) {
            return ApiResponse::sendResponse(
                true,
                $message,
                'Opération effectuée.'
            );
        } else {
            return ApiResponse::sendResponse(
                false,
                [],
                'Message introuvable.'
            );
        }
    }


    public function delete_m(string $id)
    {
        $user = $this->discutionInterface->delete_m($id);

        $user->delete();

        return ApiResponse::sendResponse(true, [], 'Opération effectuée.');
    }
}
