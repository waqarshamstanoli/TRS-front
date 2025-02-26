import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://your-api.com/events'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  saveEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }
}
