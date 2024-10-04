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
        Route::get('users_show/{id}', [UserController::class, 'show']);
        Route::post('send_m/{userId}/{userId2}', [DiscutionController::class, 'send_m']);
        Route::get('users_index', [UserController::class, 'index']);
        Route::get('show_m/{id1}/{id2}', [DiscutionController::class, 'show_m']);
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('groupes_index', [GroupeController::class, 'index']);
        Route::get('one_groupes_show/{id}', [GroupeController::class, 'show']);
        Route::get('showAllForUser/{id}', [GroupeController::class, 'showAllForUser']);
        Route::get('show_g_m/{groupId}', [GroupeDiscutionController::class, 'show_g_m']);

        Route::post('new_groupe/{id}', [GroupeController::class, 'create']);
        Route::post('addMember/{userId}/{groupeId}', [GroupeMemberController::class, 'addMember']);
        Route::post('send_g_m/{userId}/{groupeId}', [GroupeDiscutionController::class, 'send_g_m']);

        Route::patch('update/{id}', [UserController::class, 'update']);
        Route::patch('update/{id}', [GroupeController::class, 'update']);

        Route::delete('delete/{id}', [UserController::class, 'destroy']);
        Route::delete('delete/{id}', [GroupeController::class, 'delete']);
        Route::delete('delete_m/{id}', [DiscutionController::class, 'delete_m']);
        Route::delete('delete_g_m/{id}', [GroupeDiscutionController::class, 'delete_g_m']);
        Route::delete('ejecteMember/{userId}/{groupeId}', [GroupeMemberController::class, 'ejecteMember']);
        Route::post('addOtherMember/{groupeId}/{userId}', [OtherGroupeMembeController::class, 'addOtherMember']);
    });
});
