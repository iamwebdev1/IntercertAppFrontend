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


  constructor(private authService: AuthService, private router: Router) { }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebar() {
    if (window.innerWidth <= 992) {
      this.isSidebarCollapsed = false;
    }
  }
  onLogout() {
    console.log("Clicked logout");
    
    this.authService.logout().subscribe({
      next: () => {
        // Redirect to login page after successful logout
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Even if server logout fails, clear local client state
        console.error('Logout error', err);
        this.authService.clientOnlyLogout();
      }
    });
  }
}

