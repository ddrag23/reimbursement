<?php

namespace Database\Seeders;

use App\Constant\RoleConstant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'superadmin',
                'password' => Hash::make('password'),
                'email' => 'superadmin@mail.com',
                'user_role' => RoleConstant::SUPERADMIN,
            ],
            [
                'name' => 'admin',
                'password' => Hash::make('password'),
                'email' => 'admin@mail.com',
                'user_role' => RoleConstant::ADMIN
            ],
            [
                'name' => 'pegawai',
                'password' => Hash::make('password'),
                'email' => 'pegawai@mail.com',
                'user_role' => RoleConstant::PEGAWAI
            ],
            [
                'name' => 'kasir',
                'password' => Hash::make('password'),
                'email' => 'kasir@mail.com',
                'user_role' => RoleConstant::KASIR
            ]
        ];
        collect($users)->each(function ($item) {
            $userData = array(
                'name' => $item['name'],
                'email' => $item['email'],
                'password' => $item['password'],
            );
            User::create($userData)
                ->assignRole($item['user_role']);
        });
    }
}
