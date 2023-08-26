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
        $query = User::paginate($request->take);
        return new QueryAdapterCollection($query);
    }
}
