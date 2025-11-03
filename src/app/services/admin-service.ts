import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  createUser(payload: { name: string; email: string; password: string; role?: string }): Observable<any> {
    const token = this.auth.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;


    return this.http.post(`${this.baseUrl}/user/create-user`, payload, { headers });
  }
}
