import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  userName: string | null = '';
  userRole: string | null = '';
  userEmail: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userEmail = JSON.parse(user).email; 
      this.userRole = JSON.parse(user).role; 
      this.userName = JSON.parse(user).userName; 
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
