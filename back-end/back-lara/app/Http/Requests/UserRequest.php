<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|unique:users',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|max:320|unique:users',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5048',
        ];
    }

    public function messages()
    {
        //Un peu comme les messages d'erreurs, mais pour le register

        return [
            'username.required' => 'Veuillez renseigner votre nom d\'utilisateur',
            'username.string' => 'Veuillez entrer des lettres',
            'username.unique' => 'Nom d\'utilisateur déjà utilisé',

            'first_name.required' => 'Veuillez renseigner votre prénom',
            'first_name.string' => 'Veuillez entrer des lettres',

            'last_name.required' => 'Veuillez renseigner votre nom',
            'last_name.string' => 'Veuillez entrer des lettres',

            'email.required' => 'Veuillez renseigner votre email',
            'email.unique' => 'L\'email existe déjà',
            'email.email' => 'L\'email est invalide',

            'password.required' => 'Veuillez entrer votre mot de passe',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password_confirmation.same' => 'Les mot de passes ne sont pas conformes',

            'image.image' => 'Le fichier doit être une image',
            'image.mimes' => 'Le fichier doit être au format jpeg, png ou jpg',
            'image.max' => 'La taille du fichier doit être inférieure à 5MB',
        ];
    }
}
