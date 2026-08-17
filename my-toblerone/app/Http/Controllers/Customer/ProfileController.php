<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\UpdateCustomerProfileRequest;
use App\Http\Resources\CustomerProfileResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return new CustomerProfileResource($request->user()->customer->load('user'));
    }

    public function update(UpdateCustomerProfileRequest $request)
    {
        $customer = $request->user()->customer;
        $customer->update($request->validated());

        return new CustomerProfileResource($customer->load('user'));
    }
}
