import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private userAddUrl = `${this.apiUrl}/users/add`;
  private userGetUrl = `${this.apiUrl}/users`;
  private deleteUrl = `${this.apiUrl}/users/delete`;
  private updateUrl = `${this.apiUrl}/users/update`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userGetUrl);
  }

  saveUser(userData: any): Observable<any> {
    return this.http.post(this.userAddUrl, userData);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.updateUrl}/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${userId}`);
  }
}
