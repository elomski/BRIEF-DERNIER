<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\AuthInterface;
use App\Responces\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    private AuthInterface $authInterface;

    public function __construct(AuthInterface $authInterface)
    {
        $this->authInterface = $authInterface;
    }

    public function register(AuthRequest $authRequest)
    {

        $filePath = null;

        if ($authRequest->hasFile('image')) {

            $image = $authRequest->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension(); // Nom unique pour l'image
            $filePath = $image->storeAs('profil_images', $imageName, 'public'); // Stockage de l'image dans 'public/profile_images'

        }

        $data = [
            'username' => 'username',
            'first_name' => $authRequest->first_name,
            'last_name' => $authRequest->last_name,
            'email' => $authRequest->email,
            'password' => $authRequest->password,
            'password_confirmation' => $authRequest->password_confirmation,
            'image' => $filePath,
        ];

        DB::beginTransaction();

        try {
            $user = $this->authInterface->register($data);
            DB::commit();

            return ApiResponse::sendResponse(
                true,
                [new UserResource($user)],
                'Opération effectuée.'
            );
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function login(LoginRequest $loginRequest)
    {
        $data = [
            'usernameOrEmail' => $loginRequest->usernameOrEmail,
            'password' => $loginRequest->password,
        ];

        DB::beginTransaction();

        try {
            $user = $this->authInterface->login($data);
            DB::commit();

            if ($user) {
                return ApiResponse::sendResponse(
                    $user,
                    [],
                    'Connexion réussie.',
                    $user ? 200 : 401
                );
            } else {
                return ApiResponse::sendResponse(
                    $user,
                    [],
                    'Informations incorrectes.',
                    $user ? 200 : 401
                );
            }
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function checkOtpCode(Request $request)
    {
        $data = [
            'email' => $request->email,
            'otp_code' => $request->otp_code,
        ];
        
        try {
            DB::beginTransaction();
            $user = $this->authInterface->checkOtpCode($data, true);
            $groupe = null;
            if ($user)
                $groupe = $this->authInterface->checkOtpCode($data, false);
            else
                return ApiResponse::sendResponse(false, [], 'Code OTP incorrect.', $user ? 200 : 401);
            DB::commit();


            return ApiResponse::sendResponse(true, [$groupe], 'Code OTP correct.', $user ? 200 : 401);
        } catch (\Throwable $th) {
            //throw $th;
            return $th;
            return ApiResponse::rollback($th);
        }
    }

    public function logout()
    {

        $user = $this->authInterface->logout();
        $user->tokens()->delete();

        return ApiResponse::sendResponse(
            true,
            [],
            'Déconnexion réussie.',
            200
        );
    }
}