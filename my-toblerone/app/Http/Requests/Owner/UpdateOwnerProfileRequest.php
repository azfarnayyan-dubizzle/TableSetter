<?php

namespace App\Http\Requests\Owner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOwnerProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'business_tax_id' => ['nullable', 'string', 'max:50'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            // is_identity_verified is intentionally NOT included here --
            // that should only ever be set by an internal verification
            // process, never by the owner themselves.
        ];
    }
}
