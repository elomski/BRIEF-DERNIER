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

    public function send_m(DiscutionRequest $discutionRequest, $userId)
    {
        $filePath = null;

        if ($discutionRequest->hasFile('file')) {

            $file = $discutionRequest->file('file');
            $fileName = time() . '.' . $file->getClientOriginalExtension(); // Nom unique pour le fichier
            $filePath = $file->storeAs('files', $fileName, 'public'); // Stockage de le fichier dans 'public/files'

        }

        $message = [
            'user_id' => $userId,
            'message' => $discutionRequest->message,
            'file' => $filePath
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

    public function show_m()
    {
        $message = $this->discutionInterface->show_m();

        return ApiResponse::sendResponse(
            true, 
            $message, 
            'Opération effectuée.'
        );
    }

    public function delete_m(string $id)
    {
        $user = $this->discutionInterface->delete_m($id);

        $user->delete();

        return ApiResponse::sendResponse(true, [], 'Opération effectuée.');
    }
}
