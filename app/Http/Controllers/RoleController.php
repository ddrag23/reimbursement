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

    public function store(Request $request)
    {
        $request->validate([
            'role_name' => 'required',
            'permissions' => 'required',
        ]);
        $save = Role::create(['name' => $request->role_name]);
        $save->syncPermissions(json_decode($request->permissions));
        return redirect()->route('role.index')->with("message", "Buat data berhasil");
    }

    public function edit(int $id)
    {
        $data = Role::with('permissions')->findOrFail($id);
        return inertia('Role/Edit', ['title'  => 'Edit Role', 'permissions' => Permission::all()->pluck('name'), 'query' => $data]);
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'role_name' => 'required',
            'permissions' => 'required',
        ]);
        $save = Role::findById($id);
        $save->syncPermissions(json_decode($request->permissions));
        $save->update(['name' => $request->role_name]);
        return redirect()->route('role.index')->with("message", "Edit data berhasil");
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->revokePermissionTo($role->permissions->pluck('name'));
        $role->delete();
        return redirect()->route('role.index')->with('message', 'Hapus data berhasil');
    }
}
