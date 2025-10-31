import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }


  signup(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/signup`, userData);
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        // Expected response: { access_token: "JWT_TOKEN" }
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }

  googleLogin(idToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/google`, { idToken }).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    return this.http.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          // Clear any client-side stored tokens/state
          localStorage.removeItem('access_token');
          // update auth state (if using BehaviorSubject)
        }),
      );
  }

  // helper to do client-only logout (if you store tokens in localStorage)
  clientOnlyLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
