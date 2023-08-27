<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = ['user-management', 'role-management', 'assign-permisson-role', 'assign-role-user', 'create-user', 'edit-user', 'delete-user', 'create-role', 'edit-role', 'delete-role'];
        collect($permissions)->each(fn ($item) => Permission::create(['name' => $item]));
    }
}
