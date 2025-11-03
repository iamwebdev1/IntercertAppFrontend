import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  userRole?: string;
  role?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }


  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    console.log("This give token", token);

    if (!token) return null;

    try {
      const payload: JwtPayload = jwtDecode(token);
      console.log('Decoded JWT payload:', payload);
      return payload.userRole ?? payload.role ?? null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }


  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.access_token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }


  // googleLogin(idToken: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/auth/google`, { idToken }, { withCredentials: true })
  // }

  googleLogin(idToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/google`, { idToken }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          const token = response.access_token;
          if (token) {
            localStorage.setItem('token', token);
          }
        })
      );
  }


  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true })
  }

  clientOnlyLogout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }


  private clearToken() {
    localStorage.removeItem('token');
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
