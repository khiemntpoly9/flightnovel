<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{

	public function rules(): array
	{
		return [
			'avatar' => 'required|mimes:jpg,png|max:3000'
		];
	}

	public function messages(): array
	{
		return [
			'avatar.required' => 'Vui lòng chọn ảnh',
			'avatar.mimes' => 'Ảnh không đúng định dạng',
			'avatar.max' => 'Ảnh không được quá 3MB',
		];
	}
}