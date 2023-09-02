<?php

namespace App\Http\Controllers;

use App\Http\Resources\QueryAdapterCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Spatie\Permission\Models\Role;

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

    public function create()
    {
        return inertia('User/Create', ['title' => 'Create User', 'roles_query' => Role::all()->pluck('name')]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'roles' => 'required',
        ]);
        $form = $request->all();
        $form['password'] = Hash::make("password");
        $save = User::create($form);
        $save->syncRoles(json_decode($request->roles));
        return redirect()->route('user.index')->with("message", "Buat data berhasil");
    }

    public function edit(int $id)
    {
        $data = User::with('roles')->findOrFail($id);
        return inertia('User/Edit', ['title'  => 'Edit User', 'roles_query' => Role::all()->pluck('name'), 'query' => $data]);
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => ['required', Rule::unique('users')->ignore($id)],
            'roles' => 'required',
        ]);
        $save = User::findOrFail($id);
        $save->syncRoles(json_decode($request->roles));
        $save->update($request->all());
        return redirect()->route('user.index')->with("message", "Edit data berhasil");
    }

    public function destroy($id)
    {
        $user = User::with('roles')->findOrFail($id);
        collect($user->roles->pluck('name'))->each(fn ($item) => $user->removeRole($item));;
        $user->delete();
        return redirect()->route('user.index')->with('message', 'Hapus data berhasil');
    }
}
