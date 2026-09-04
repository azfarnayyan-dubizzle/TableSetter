<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Owner\UpdateOwnerProfileRequest;
use App\Http\Resources\OwnerProfileResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return new OwnerProfileResource($request->user()->owner->load('user'));
    }

    public function update(UpdateOwnerProfileRequest $request)
    {
        $owner = $request->user()->owner;
        $owner->update($request->validated());

        return new OwnerProfileResource($owner->load('user'));
    }
}
