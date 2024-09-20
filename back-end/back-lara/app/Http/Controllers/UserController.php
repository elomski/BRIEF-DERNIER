<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\UserInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    private UserInterface $userInterface;
    public function __construct(UserInterface $userInterface)
    {
        $this->userInterface = $userInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = $this->userInterface->index();

        return ApiResponse::sendResponse(true, [new UserResource($user)], 'Opération effectuée.', $user ? 200 : 400);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userInterface->show($id);

        if (!$user)
            return ApiResponse::sendResponse(false, [], 'failed', $user ? 200 : 400);
        else
            return ApiResponse::sendResponse(true, [new UserResource($user)], 'success', $user ? 200 : 400);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // $validator = Validator::make($request->all(), [
        //     'username' => 'required|string|max:255|unique:users',
        //     'first_name' => 'required|string|max:255',
        //     'last_name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5048',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }


        // Créer un nouvel utilisateur
        // $user = User::create([

        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        // ]);

        $user = $this->userInterface->update($request, $id);

        if ($user)
            return ApiResponse::sendResponse(
                true,
                new UserResource($user),
                "vos informations ont été mis à jour avec succès !"
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->userInterface->delete($id);

        if (!$user)
            return ApiResponse::sendResponse(false, [], 'Utilisateur introuvable.', $user ? 200 : 400);
        else
            $user->delete();
        return ApiResponse::sendResponse(true, [], 'Utilisateur supprimé.', $user ? 200 : 400);
    }
}
