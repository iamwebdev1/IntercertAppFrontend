import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {


  isSidebarCollapsed = false;
  isAdmin = false;


  constructor(private authService: AuthService, private router: Router) { 
    this.isAdmin = this.authService.isAdmin();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (window.innerWidth <= 992) {
      this.isSidebarCollapsed = false;
    }
  }
 onLogout() {
  console.log('Clicked logout');

  this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Logout error', err);
      this.authService.clientOnlyLogout();
    },
    complete: () => {
      localStorage.removeItem('token'); // final safety
      this.router.navigate(['/login']);
    }
  });
}

}

