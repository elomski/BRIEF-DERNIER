<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupeRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\GroupeInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupeController extends Controller
{
    private GroupeInterface $groupeInterface;
    public function __construct(GroupeInterface $groupeInterface)
    {
        $this->groupeInterface = $groupeInterface;
    }

    public function index()
    {
        $groupes = $this->groupeInterface->index();

        return ApiResponse::sendResponse(true, [new UserResource($groupes)], 'Opération effectuée.');
    }

    public function create(GroupeRequest $groupeRequest, $id)
    {

        $filePath = 'groupe_image\4-01.jpg';

        $groupeData = [
            'user_id' => $id,
            'name' => $groupeRequest->name,
            'description' => $groupeRequest->description,
            'image' => $filePath,
        ];

        DB::beginTransaction();

        try {
            $groupe = $this->groupeInterface->create($groupeData);
            DB::commit();

            return ApiResponse::sendResponse(
                true,
                [new UserResource($groupe)],
                'Opération effectuée.'
            );
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function update(GroupeRequest $groupeRequest, $id)
    {
        $groupe_update = $this->groupeInterface->update($groupeRequest, $id);

        return ApiResponse::sendResponse(true, [new UserResource($groupe_update)], 'Modification réussie.');
    }

    public function delete($id)
    {
        $this->groupeInterface->delete($id);

        return ApiResponse::sendResponse(true, [], 'Suppression réussie.');
    }

    public function show(string $id)
    {
        $groupe = $this->groupeInterface->show($id);

        return ApiResponse::sendResponse(true, [new UserResource($groupe)], 'Opération effectuée.');
    }

    public function showOne(string $id)
    {
        $groupe = $this->groupeInterface->showOne($id);

        return ApiResponse::sendResponse(true, [new UserResource($groupe)], 'Opération effectuée.');
    }

    public function showForUser(string $id)
    {
        $groupe = $this->groupeInterface->showForUser($id);

        return ApiResponse::sendResponse(true, [new UserResource($groupe)], 'Opération effectuée.');
    }

    public function showAllForUser(string $id)
    {
        $groupe = $this->groupeInterface->showAllForUser($id);

        if ($groupe)
            return ApiResponse::sendResponse(true, [new UserResource($groupe)], 'Opération effectuée.');
        else
            return ApiResponse::sendResponse(false, [], 'Utilisateur introuvable.', $groupe ? 200 : 400);
    }
}
