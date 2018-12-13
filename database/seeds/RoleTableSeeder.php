<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_user = new Role();
        $role_user->name = 'user';
        $role_user->description = 'Common user role';
        $role_user->save();

        $role_admin = new Role();
        $role_admin->name = 'admin';
        $role_admin->description = 'Site administrator';
        $role_admin->save();

        $role_superadmin = new Role();
        $role_superadmin->name = 'superadmin';
        $role_superadmin->description = 'Super administrator with all privileges';
        $role_superadmin->save();
    }
}
