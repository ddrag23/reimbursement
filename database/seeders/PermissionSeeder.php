<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('model_has_permissions')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Permission::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        $permissions = ['dashboard', 'profile', 'reimbursement', 'user-management', 'role-management', 'assign-permisson-role', 'assign-role-user', 'create-user', 'edit-user', 'delete-user', 'create-role', 'edit-role', 'delete-role', 'create-reimbursement', 'edit-reimbursement', 'delete-reimbursement', 'approve-reimbursement', 'reject-reimbursement'];
        collect($permissions)->each(fn ($item) => Permission::create(['name' => $item]));
    }
}
