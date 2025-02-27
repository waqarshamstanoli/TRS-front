import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl;
  private eventaddUrl = `${this.apiUrl}/events/add`; 
  private eventgetUrl = `${this.apiUrl}/events/get`; 
  constructor(private http: HttpClient) {}
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventgetUrl);
  }
  saveEvent(eventData: any): Observable<any> {
    return this.http.post(this.eventaddUrl, eventData);
  }
}
