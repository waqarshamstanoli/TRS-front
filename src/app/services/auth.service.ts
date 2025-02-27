// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private registerUrl = `${this.apiUrl}/auth/register`; // Register endpoint
  private loginUrl = `${this.apiUrl}/auth/login`; 

  constructor(private http: HttpClient, private router: Router) {}
  register(email: string, password: string, c_password: string, userName: string): Observable<any> {
    const body = { email, password, c_password, userName };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.registerUrl, body, { headers });
  }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.loginUrl, body, { headers });
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Ensure redirection after logout
  }
}
