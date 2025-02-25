// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/auth/register'; // Replace with your API URL

  constructor(private http: HttpClient) {}
  register(email: string, password: string, c_password: string): Observable<any> {
    const body = { email, password, c_password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.loginUrl, body, { headers });
  }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.loginUrl, body, { headers });
  }
}
