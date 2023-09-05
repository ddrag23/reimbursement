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
                'nip' => 'sp12345',
                'user_role' => RoleConstant::SUPERADMIN,
            ],
            [
                'name' => 'direktur',
                'password' => Hash::make('password'),
                'email' => 'direktur@mail.com',
                'nip' => '1234',
                'user_role' => RoleConstant::DIREKTUR
            ],
            [
                'name' => 'staff',
                'password' => Hash::make('password'),
                'email' => 'staff@mail.com',
                'nip' => '1235',
                'user_role' => RoleConstant::STAFF
            ],
            [
                'name' => 'finance',
                'password' => Hash::make('password'),
                'email' => 'finance@mail.com',
                'nip' => '1236',
                'user_role' => RoleConstant::FINANCE
            ]
        ];
        collect($users)->each(function ($item) {
            $userData = array(
                'name' => $item['name'],
                'email' => $item['email'],
                'password' => $item['password'],
                'nip' => $item['nip'],
            );
            User::create($userData)
                ->assignRole($item['user_role']);
        });
    }
}
