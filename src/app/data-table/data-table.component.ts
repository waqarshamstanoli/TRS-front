import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  eventForm: FormGroup;
  showModal = false;
  eventName = '';
  eventDescription = '';
  constructor(private eventService: EventService, private fb: FormBuilder, ) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  saveEvent() {
    if (!this.eventName.trim()) {
      alert('Event name is required');
      return;
    }

    const eventData = { name: this.eventName };
    
    this.eventService.saveEvent(eventData).subscribe(
      response => {
        console.log('Event saved:', response);
        alert('Event saved successfully!');
        this.closeModal();
      },
      error => {
        console.error('Error saving event:', error);
        alert('Failed to save event.');
      }
    );
  }
}
