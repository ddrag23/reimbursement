<?php

namespace Database\Seeders;

use App\Constant\RoleConstant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AssignRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superadmin = Role::where('name', RoleConstant::SUPERADMIN)->first();
        $admin = Role::where('name', RoleConstant::ADMIN)->first();
        $superadmin->syncPermissions(['user-management', 'role-management', 'assign-permisson-role', 'assign-role-user', 'create-user', 'edit-user', 'delete-user', 'create-role', 'edit-role', 'delete-role']);
        $admin->syncPermissions(['user-management', 'assign-role-user', 'create-user', 'edit-user', 'delete-user']);
    }
}
