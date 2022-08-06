<?php

namespace App\Http\Controllers;

use App\Models\Contactos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;

class ControllerCRUBContactos extends Controller
{
    public function create(Request $request)
    {
        $validate = Contactos::where('phone',$request->phone)->first();
        if($validate==null){
            $contactos = new Contactos();
            $contactos->name = $request->name;
            $contactos->phone = $request->phone;
            $contactos->user_id = Auth::user()->id;
            $contactos->save();
            return response(['msg' => 'Contacto creado correctamente'], 200); 
        }
        return response(['msg' => 'Numero de telefono ya existe'], 200); 
    }

    public function read()
    {
        $contactos = Contactos::where('user_id',Auth::user()->id)->get();
        return response($contactos,200);
    }

    public function update(Request $request)
    {
        $validate = Contactos::where('phone',$request->phone)->first();
        if($validate==null){
            Contactos::where('id', $request->id)->update(
                [
                    'name' => $request->name,
                    'phone' => $request->phone
                ]
            );
            return response(['msg' => 'ACTUALIZADO CORRECTAMENTE'], 200);
        }
        return response(['msg' => 'Numero de telefono ya existe'], 200); 
    }
    public function delete(Request $request){
        $contacto = Contactos::where('id',$request->id)->first();
        if($contacto!=null){ 
            $contacto->delete();
        }
    }
}
