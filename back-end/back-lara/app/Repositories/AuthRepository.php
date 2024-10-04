<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;
use App\Interfaces\GroupeMemberInterface;
use App\Mail\OtpCodeEmail;
use App\Models\GroupeMember;
use App\Models\OtherGroupeMember;
use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthRepository implements AuthInterface
{
    private GroupeMemberInterface $groupeMemberInterface;
    /**
     * Create a new class instance.
     */
    public function __construct(GroupeMemberInterface $groupeMemberInterface)
    {
        $this->groupeMemberInterface = $groupeMemberInterface;
    }

    public function register(array $data)
    {
        $email = $data['email'];
        $user = User::create($data);

        $otp_code = [
            'email' => $email,
            'otp_code' => rand(111111, 999999)
        ];

        OtpCode::where('email', $email)->delete();
        OtpCode::create($otp_code);

        Mail::to($email)->send(
            new OtpCodeEmail(
                $data['username'],
                $otp_code['otp_code']
            )
        );

        return $user;
    }

    public function login(array $data)
    {
        $usernameOrEmail = $data['usernameOrEmail'];
        $user = User::where('email', $usernameOrEmail)
            ->orWhere('username', $usernameOrEmail)->first();

        if (!$user)
            return false;

        if (!Hash::check($data['password'], $user->password))
            return false;

        $user->tokens()->delete();
        $user->token = $user->createToken($user->id)->plainTextToken;

        return $user;
    }

    public function logout()
    {
        return User::find(auth()->user()->getAuthIdentifier());
    }

    public function checkOtpCode(array $data, $if)
    {
        if ($if) {
            $email = $data['email'];
            $otp_code = OtpCode::where('email', $email)->first();

            // $check = $this->if_is_already_in_groupe($data);


            if (!$otp_code)
                return false;

            if ($otp_code->otp_code == $data['otp_code']) {

                return true;
            }

            return false;
        } else {
            $email = $data['email'];

            $check_if_in_groupes = OtherGroupeMember::where('email', $email)->get();

            $userId = User::where('email', $email)->first();
            $userId->is_confirm = true;
            $userId->save();

            if ($check_if_in_groupes) {
                foreach ($check_if_in_groupes as $check_if_in_groupe) {
                    $data = [
                        'user_id' => $userId->id,
                        'groupe_id' => $check_if_in_groupe->groupe_id,
                    ];
                    // $success = 'success';

                    GroupeMember::create($data);
                    // $this->groupeMemberInterface->addMember($data);
                    $check_if_in_groupe->delete();
                    // DB::commit();
                    // return $data;
                    // try {
                    // } catch (\Throwable $th) {
                    //     //throw $th;
                    //     return $th;
                    //     // DB::rollBack(); // Annule la transaction en cas d'erreur
                    //     return false;
                    // }
                }
                return $check_if_in_groupes;
            }

            return $check_if_in_groupes;

            return false;
        }
    }
}
