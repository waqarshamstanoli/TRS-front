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
  editingEvent: any = null;
  deleteEventId: any = null;
  private modalInstance!: Modal;
  private deleteModalInstance!: Modal
  eventColumns = [
    { key: 'eventName', title: 'Event Name' },
    { key: 'eventDate', title: 'Date' },
    { key: 'eventDescription', title: 'Description' }
  ];
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
    this.deleteModalInstance = new Modal(document.getElementById('deleteModal')!);
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
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
    if (this.editingEvent){
      this.eventService.updateEvent(this.editingEvent._id, eventData ).subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success(response.message, 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
  
         
          this.getAllEvents();
          this.resetForm();
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
    else {
      this.eventService.saveEvent(eventData).subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success(response.message, 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
  
         
          this.getAllEvents();
          this.resetForm();
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

    
  }
  resetForm() {
    this.eventForm.reset();
    this.editingEvent = null; // Reset edit mode
  }
  onEdit(event: any) {
    this.modalInstance.show();
    const formattedDate = event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : '';

  this.eventForm.patchValue({
    eventName: event.eventName,
    eventDate: formattedDate, 
    eventDescription: event.eventDescription
  });
    console.log(this.eventForm)
    this.editingEvent = event;
  }
  onDelete(event: any) {
    this.deleteModalInstance.show();
    this.deleteEventId = event._id
  
  }
  confirmDelete() {
    this.deleteModalInstance.hide();
    this.eventService.deleteEvent(this.deleteEventId).subscribe(
      () => {
        this.toastr.success("Event deleted successfully", "Success");
        this.fetchEvents();
      },
      (error: any) => {
        this.toastr.error("Error deleting event", "Error");
      }
    );
  }
  fetchEvents() {
    this.eventService.getEvents().subscribe(
      (response) => {
        this.events = response;
      },
      (error) => {
        this.toastr.error("Failed to load events", "Error");
      }
    );
  }
  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
  }
  closeDeleteModal() {
    this.deleteModalInstance.hide();
  }
}
