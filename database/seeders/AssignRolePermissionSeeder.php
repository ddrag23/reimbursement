<?php

namespace Database\Seeders;

use App\Constant\RoleConstant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AssignRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('role_has_permissions')->truncate();
        $superadmin = Role::where('name', RoleConstant::SUPERADMIN)->first();
        $direktur = Role::where('name', RoleConstant::DIREKTUR)->first();
        $staff = Role::where('name', RoleConstant::STAFF)->first();
        $finance = Role::where('name', RoleConstant::FINANCE)->first();
        $superadmin->syncPermissions(['dashboard', 'profile', 'reimbursement', 'user-management', 'role-management', 'assign-permisson-role', 'assign-role-user', 'create-user', 'edit-user', 'delete-user', 'create-role', 'edit-role', 'delete-role', 'create-reimbursement', 'edit-reimbursement', 'delete-reimbursement', 'approve-reimbursement', 'reject-reimbursement']);
        $direktur->syncPermissions(['dashboard', 'profile', 'reimbursement', 'user-management', 'assign-role-user', 'create-user', 'edit-user', 'delete-user', 'approve-reimbursement', 'reject-reimbursement']);
        $staff->syncPermissions(['dashboard', 'profile', 'reimbursement', 'create-reimbursement', 'edit-reimbursement', 'delete-reimbursement']);
        $finance->syncPermissions(['dashboard', 'profile', 'reimbursement', 'approve-reimbursement', 'reject-reimbursement']);
    }
}
