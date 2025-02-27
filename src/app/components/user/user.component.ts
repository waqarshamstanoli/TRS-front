import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showModal = false;
  userForm: FormGroup;
  users: any[] = [];
  isLoading = false;
  editingUser: any = null;
  deleteUserId: any = null;
  private modalInstance!: Modal;
  private deleteModalInstance!: Modal;

  userColumns = [
    { key: 'userName', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' }
  ];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const modalElement = document.getElementById('userModal');
    this.deleteModalInstance = new Modal(document.getElementById('deleteModal')!);
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe(
      (response:any) => {
        this.users = response;
      },
      (error:any) => {
        this.toastr.error('Failed to fetch users', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;
    const userData = this.userForm.value;

    if (this.editingUser) {
      this.userService.updateUser(this.editingUser._id, userData).subscribe(
        (response:any) => {
          this.isLoading = false;
          this.toastr.success(response.message, 'Success');
          this.getAllUsers();
          this.resetForm();
          this.closeModal();
        },
        (error:any) => {
          this.isLoading = false;
          this.toastr.error(error.error.message, 'Error');
        }
      );
    } else {
      this.userService.saveUser(userData).subscribe(
        (response:any) => {
          this.isLoading = false;
          this.toastr.success(response.message, 'Success');
          this.getAllUsers();
          this.resetForm();
          this.closeModal();
        },
        (error:any) => {
          this.isLoading = false;
          this.toastr.error(error.error.message, 'Error');
        }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.editingUser = null;
  }

  onEdit(user: any) {
    this.modalInstance.show();
    this.userForm.patchValue({
      name: user.userName,
      email: user.email,
      role: user.role
    });
    this.editingUser = user;
  }

  onDelete(user: any) {
    this.deleteModalInstance.show();
    this.deleteUserId = user._id;
  }

  confirmDelete() {
    this.deleteModalInstance.hide();
    this.userService.deleteUser(this.deleteUserId).subscribe(
      () => {
        this.toastr.success("User deleted successfully", "Success");
        this.getAllUsers();
      },
      (error: any) => {
        this.toastr.error("Error deleting user", "Error");
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
