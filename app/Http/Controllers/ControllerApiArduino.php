<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Contactos;

class ControllerApiArduino extends Controller
{
    public function create(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        $user = User::where('email', $fields['email'])->first();
        if (! $user || ! Hash::check($fields['password'], $user->password)) {
            throw ValidationException::withMessages([
                'message' => ['Unauthorized']
            ]);
        }
        $token = $user->createToken('arduino')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 200);
    }

    public function getContacts(Request $request){
        $contactos = Contactos::select('name','phone')->where('user_id',$request->user()->id)->get();
        return response($contactos,200);
    }
}
