<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscutionController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\GroupeDiscutionController;
use App\Http\Controllers\GroupeMemberController;
use App\Http\Controllers\OtherGroupeMembeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1.0.0')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('checkOtpCode', [AuthController::class, 'checkOtpCode']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('users_index', [UserController::class, 'index']);
        Route::get('users_show/{id}', [UserController::class, 'show']);
        Route::get('groupes_index', [GroupeController::class, 'index']);
        Route::get('groupes_show/{id}', [GroupeController::class, 'show']);
        Route::get('show_g_m', [GroupeDiscutionController::class, 'show_g_m']);
        Route::get('show_m', [DiscutionController::class, 'show_m']);
        
        Route::post('new_groupe/{id}', [GroupeController::class, 'create']);
        Route::post('addMember/{userId}/{groupeId}', [GroupeMemberController::class, 'addMember']);
        Route::post('send_m/{userId}', [DiscutionController::class, 'send_m']);
        Route::post('send_g_m/{userId}/{groupeId}', [GroupeDiscutionController::class, 'send_g_m']);
        Route::post('addOtherMember/{groupeId}/{userId}/{url}', [OtherGroupeMembeController::class, 'addOtherMember']);

        Route::patch('update/{id}', [UserController::class, 'update']);
        Route::patch('update/{id}', [GroupeController::class, 'update']);

        Route::delete('delete/{id}', [UserController::class, 'destroy']);
        Route::delete('delete/{id}', [GroupeController::class, 'delete']);
        Route::delete('delete_m/{id}', [DiscutionController::class, 'delete_m']);
        Route::delete('delete_g_m/{id}', [GroupeDiscutionController::class, 'delete_g_m']);
        Route::delete('ejecteMember/{userId}/{groupeId}', [GroupeMemberController::class, 'ejecteMember']);
        
    });
});