import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  showModal = false;
  eventForm: FormGroup;
  events: any[] = [];
  isLoading = false;
  private modalInstance!: Modal;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventDescription: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }

    // Fetch all events when the component initializes
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getEvents().subscribe(
      (response) => {
        this.events = response;
      },
      (error) => {
        this.toastr.error('Failed to fetch events', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  saveEvent(): void {
    if (this.eventForm.invalid) {
      return;
    }
    this.isLoading = true;
    const eventData = {
      eventName: this.eventForm.value.eventName,
      eventDate: this.eventForm.value.eventDate,
      eventDescription: this.eventForm.value.eventDescription
    };

    this.eventService.saveEvent(eventData).subscribe(
      (response) => {
        this.isLoading = false;
        this.toastr.success(response.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });

        // Refresh event list after saving
        this.getAllEvents();
        this.closeModal();
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }
}
