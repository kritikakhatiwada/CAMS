import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuardService {
  token: any;

  constructor(private authService: AuthService) { 
  }

  isStudent(token: any): boolean {
    const roles = this.authService.decodeRolesFromToken(token);
    
    // Ensure roles is an array and contains "STUDENT"
    return Array.isArray(roles) && roles.includes("STUDENT");
  }
}
