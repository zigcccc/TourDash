<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = Role::where('name', 'user')->first();
        $admin = Role::where('name', 'admin')->first();
        $superadmin = Role::where('name', 'superadmin')->first();

        $user_1 = new User();
        $user_1->name = "Žiga Krašovec";
        $user_1->email = "zkrasovec@gmail.com";
        $user_1->password = bcrypt('pass123');
        $user_1->save();
        $user_1->roles()->attach($superadmin);

        $user_2 = new User();
        $user_2->name = "Jan Horvat";
        $user_2->email = "janhorvat@gmail.com";
        $user_2->password = bcrypt('pass123');
        $user_2->save();
        $user_2->roles()->attach($admin);

        $user_3 = new User();
        $user_3->name = "Anže Lavtižar";
        $user_3->email = "anzelavtizar@gmail.com";
        $user_3->password = bcrypt('pass123');
        $user_3->save();
        $user_3->roles()->attach($user);

        $user_4 = new User();
        $user_4->name = "Lan Lakota";
        $user_4->email = "lanlakota@gmail.com";
        $user_4->password = bcrypt('pass123');
        $user_4->save();
        $user_4->roles()->attach($user);

        $user_5 = new User();
        $user_5->name = "Janja Junež";
        $user_5->email = "janjajunez@gmail.com";
        $user_5->password = bcrypt('pass123');
        $user_5->save();
        $user_5->roles()->attach($admin);
    }
}
