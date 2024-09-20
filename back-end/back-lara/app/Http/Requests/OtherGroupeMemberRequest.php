<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtherGroupeMemberRequest extends FormRequest
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
            'email' =>'required|string|email|max:320',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Veuillez renseigner l\'email.',
            'email.email' => 'format de l\'email invalide.',
        ];
    }
}
