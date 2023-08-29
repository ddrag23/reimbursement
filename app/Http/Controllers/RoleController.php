<?php

namespace App\Http\Controllers;

use App\Http\Resources\QueryAdapterCollection;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(): Response
    {
        return inertia('Role/Index', [
            'title' => 'Role Management',
            'table' => route('role.table')
        ]);
    }

    public function queryTable(Request $request)
    {
        $query = Role::query();
        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }
        return new QueryAdapterCollection($query->paginate($request->take));
    }

    public function create()
    {
        return inertia('Role/Create', ['title'  => 'Create Role', 'permissions' => Permission::all()->pluck('name')]);
    }
}
