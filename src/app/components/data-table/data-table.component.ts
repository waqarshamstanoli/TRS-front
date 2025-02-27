import { Component, Input, Output, EventEmitter   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
 
  @Input() columns: { key: string, title: string }[] = []; // Column Configurations
  @Input() data: any[] = []; // Data for Table
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editRow(row: any) {
    this.edit.emit(row);
  }

  deleteRow(row: any) {
    this.delete.emit(row);
  }

 
  
}
