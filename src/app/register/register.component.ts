import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  c_password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
   
    this.authService.register(this.email, this.password, this.c_password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        console.log('register failed', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}
