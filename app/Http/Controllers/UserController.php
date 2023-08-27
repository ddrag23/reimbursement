<?php

namespace App\Http\Controllers;

use App\Http\Resources\QueryAdapterCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return inertia('User/Index', [
            'table' => route('user.table')
        ]);
    }

    public function queryTable(Request $request)
    {
        $query = User::with('roles');
        if ($request->has('search')) {
            $query->where('email', 'like', "%{$request->search}%")->orWhere('name', 'like', "%{$request->search}%");
        }
        return new QueryAdapterCollection($query->paginate($request->take));
    }
}
