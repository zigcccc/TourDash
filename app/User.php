<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Role;
use App\Page;
use App\Accommodation;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password', 'name', 'saved_items'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = ["saved_items" => "array"];

    protected $primaryKey = 'id';

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
    * @param string|array $roles
    */
    public function authorizeRoles($roles)
    {
        if (is_array($roles)) {
            return $this->hasAnyRole($roles) || 
                    abort(401, 'This action is unauthorized.');
        } else {
            return $this->hasRole($roles) || 
                abort(401, 'This action is unauthorized.');
        }
    }
    /**
    * Check multiple roles
    * @param array $roles
    */
    public function hasAnyRole($roles)
    {
        return $this->roles()->whereIn('name', $roles)->exists();
    }
    /**
    * Check one role
    * @param string $role
    */
    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function savedItems()
    {
        return $this->hasMany(Accommodation::class, 'id', 'saved_items');
    }
}
