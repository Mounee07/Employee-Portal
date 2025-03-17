import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('userToken'); // Remove token from storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
