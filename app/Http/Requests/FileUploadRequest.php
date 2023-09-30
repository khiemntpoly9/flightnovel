<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'avatar' => 'required|mimes:jpeg,png|max:3000'
        ];
    }
}
