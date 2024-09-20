<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupeRequest extends FormRequest
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
            'name' => 'required',
            // 'name' => 'required|unique:groupes',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:5048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom du groupe est requis.',
            'name.unique' => 'Le nom du groupe est déjà utilisé.',
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'Le fichier doit être au format jpeg, png ou jpg.',
            'image.max' => 'La taille du fichier doit être inférieure à 5MB.',
        ];
    }
}
