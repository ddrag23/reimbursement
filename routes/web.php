<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReimbursementController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // user routes
    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/table', [UserController::class, 'queryTable'])->name('table');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/store', [UserController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [UserController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [UserController::class, 'update'])->name('update');
        Route::delete('/destroy/{id}', [UserController::class, 'destroy'])->name('destroy');
    });

    // role routes
    Route::prefix('role')->name('role.')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::get('/table', [RoleController::class, 'queryTable'])->name('table');
        Route::get('/create', [RoleController::class, 'create'])->name('create');
        Route::post('/store', [RoleController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [RoleController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [RoleController::class, 'update'])->name('update');
        Route::delete('/destroy/{id}', [RoleController::class, 'destroy'])->name('destroy');
    });

    // reimbursement routes
    Route::prefix('reimbursement')->name('reimbursement.')->group(function () {
        Route::get('/', [ReimbursementController::class, 'index'])->name('index');
        Route::get('/table', [ReimbursementController::class, 'queryTable'])->name('table');
        Route::get('/create', [ReimbursementController::class, 'create'])->name('create');
        Route::post('/store', [ReimbursementController::class, 'store'])->name('store');
        // Route::get('/edit/{id}', [RoleController::class, 'edit'])->name('edit');
        // Route::put('/update/{id}', [RoleController::class, 'update'])->name('update');
        Route::put('/verification/{id}', [ReimbursementController::class, 'verification'])->name('verification');
        Route::delete('/destroy/{id}', [ReimbursementController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__ . '/auth.php';
