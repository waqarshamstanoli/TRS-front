import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      c_password: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    // Redirect to dashboard if already authenticated
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }
  // Custom Validator for Password Match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('c_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    const { email, password, c_password } = this.registerForm.value;

    this.authService.register(email, password, c_password).subscribe(
      (response) => {
        this.isLoading = false; 
        console.log('Registration successful', response);
        this.toastr.success(response.message, 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      },
      (error) => {
        this.isLoading = false; 
        console.log('Registration failed', error.error.message);
        // this.errorMessage = 'Invalid credentials. Please try again.';
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    );
  }
}
