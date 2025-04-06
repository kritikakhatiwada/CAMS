import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsStudentGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isTokenExpired()) {
        console.log('Token has expired, please log in again');
        this.authService.clearToken(); // Optionally clear the expired token
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    } else {
      console.log('Please login to view the resource', 'Unauthorized');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}