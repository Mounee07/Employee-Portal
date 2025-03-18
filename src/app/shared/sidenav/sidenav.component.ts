import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  activeRoute: string = '';
  userRole: string | null = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = this.router.url;
      }
    });

    this.userRole = localStorage.getItem('userRole'); // Ensure role is stored
  }

  isActive(route: string): boolean {
    return this.activeRoute.includes(route); // Use `includes` to match nested routes
  }
}
