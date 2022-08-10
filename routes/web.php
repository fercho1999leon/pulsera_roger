<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ControllerApiArduino;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
//ROUTES API LOGIN
Route::get('/api/login',[ControllerApiArduino::class,'create']);
//API GET COPNTACTS
Route::middleware('auth:sanctum')->get('/api/contactos', [ControllerApiArduino::class,'getContacts']);

require __DIR__.'/auth.php';