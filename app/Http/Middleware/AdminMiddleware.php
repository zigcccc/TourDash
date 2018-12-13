<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->hasAnyRole(['admin', 'superadmin'])) {
            // Pass the admin and super admin, reject user role
            return $next($request);
        } else if (Auth::check()) {
            // Authenticated user has the user role, deny access
            return redirect()->route('home')->with('message', 'Access denied for your user role...');    
        }
        return redirect()->route('login');
    }
}
