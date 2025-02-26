import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated
    
    // If the user is authenticated and trying to access the auth pages, redirect to the dashboard
    if (isAuthenticated && route.routeConfig?.path?.startsWith('auth')) {
      
      this.router.navigate(['/dashboard']);
      return false;
    }

    // If the user is not authenticated and trying to access a protected route, redirect to login
    if (!isAuthenticated && route.routeConfig?.path?.startsWith('dashboard')) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
