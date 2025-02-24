import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit(): void {
   
    this.authService.register(this.username, this.password, this.role).subscribe(
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
