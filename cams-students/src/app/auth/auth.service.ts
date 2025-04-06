import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userRoles = 'userRoles';
  constructor(private http: HttpClient) {}
  private tokenKey = 'token';
  private roles: string[] = [];


  private apiUrl = 'http://localhost:3000/users/';

  getRoll(): string {
    return localStorage.getItem(this.userRoles) || '';
  }
  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}login`, user);
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return token !== null && token !== '';
  }
  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return true; // Token is not available, consider it as expired
    }

    const tokenExpiration = this.extractTokenExpiration(token);
    const currentTime = new Date().getTime() / 1000; // Current time in seconds

    return tokenExpiration <= currentTime;
  }
  clearToken(): void {
    localStorage.removeItem('access_token');                             
  }
  clearuserRoles(): void {
    localStorage.removeItem(this.userRoles);      
  }

  public setAccessToken(accessToken: any): void {
    localStorage.setItem('access_token', accessToken);
    this.decodeRolesFromToken(accessToken);
  }

  public setRefreshToken(refreshToken: any): void {
    localStorage.setItem('refresh_token', refreshToken);
  }

  decodeRolesFromToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      this.roles = payload.roles || []; // Extract roles
      console.log("roles",this.roles);
      
    } catch (error) {
      console.error('Error decoding token:', error);
      this.roles = [];
    }
  }


  getUserRoles(): string[] {
    if (this.roles.length === 0) {
      const token = this.getAccessToken();
      if (token) {
        this.decodeRolesFromToken(token);
      }
    }
    return this.roles;
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  private extractTokenExpiration(token: string): number {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.exp;
    } catch (error) {
      return 0; // Invalid token format, consider it as expired
    }
  }

  getCurrentUser() {
    return this.http.get(`${environment.base_url}users/currentUser`);
  }
}