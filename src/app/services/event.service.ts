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
  private deleteUrl = `${this.apiUrl}/events/delete`; 
  private updateUrl = `${this.apiUrl}/events/edit`; 
  constructor(private http: HttpClient) {}
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventgetUrl);
  }
  saveEvent(eventData: any): Observable<any> {
    return this.http.post(this.eventaddUrl, eventData);
  }
  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.put(`${this.updateUrl}/${eventId}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${eventId}`);
  }
}
