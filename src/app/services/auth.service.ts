// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private registerUrl = `${this.apiUrl}/auth/register`; // Register endpoint
  private loginUrl = `${this.apiUrl}/auth/login`; 

  constructor(private http: HttpClient) {}
  register(email: string, password: string, c_password: string): Observable<any> {
    const body = { email, password, c_password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.registerUrl, body, { headers });
  }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.loginUrl, body, { headers });
  }
}
