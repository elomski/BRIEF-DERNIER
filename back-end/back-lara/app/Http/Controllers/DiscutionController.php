<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\DiscutionRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\DiscutionInterface;
use App\Mail\FileSendEmail;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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
        $if_fille = false;
        $fileType = [];

        if ($discutionRequest->hasFile('file')) {

            $files = $discutionRequest->file('file');

            $if_fille = true;

            foreach ($files as $file) {
                $fileName = time() . rand(10000, 99999) . '.' . $file->getClientOriginalExtension(); // Nom unique pour le fichier
                $filePath = $file->storeAs(`/files/`, $fileName, 'public'); // Stockage de le fichier dans 'public/files'
                $filePaths[] = `/storage/` . $filePath;
                $fileType[] = $file->getClientOriginalExtension();
            }
        }

        $message = [
            'user_id' => $userId,
            'user_id2' => $userId2,
            'message' => $discutionRequest->message,
            'file' => $filePaths,
            'file_type' => $fileType
        ];
        DB::beginTransaction();

        try {
            $discution = $this->discutionInterface->send_m($message, $if_fille);
            DB::commit();
            event(new MessageSent($discution));

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

        if (!$message) {
            return ApiResponse::sendResponse(
                true,
                $message,
                'Message introuvable.'
            );
        } else {
            return ApiResponse::sendResponse(
                false,
                $message,
                'Opération effectuée.'
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
