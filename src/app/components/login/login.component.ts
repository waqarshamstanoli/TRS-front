import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    // Initialize Form Group with Validation Rules
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    // Redirect to dashboard if already authenticated
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }
  // Submit Login Form
  onLogin(): void {
    if (this.loginForm.invalid) {
      return; // Stop if the form is invalid
    }
    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response: { token: string; user?: any; message: string | undefined; }) => {
        this.isLoading = false;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); 
        this.toastr.success(response.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      },
      (error: { error: { message: string | undefined; }; }) => {
        this.isLoading = false;
        console.error('Login failed', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    );
  }
}
