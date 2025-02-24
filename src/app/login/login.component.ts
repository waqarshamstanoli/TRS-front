// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Navigate to a dashboard or home page after login
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}
