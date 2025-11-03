import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone : true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {


  isSidebarCollapsed = false;
  isAdminUser = false;


  constructor(private authService: AuthService, private router: Router) { 
    
  }

 ngOnInit() {
  const role = this.authService.getUserRole(); 
  console.log('User Role from AuthService:', role);
  this.isAdminUser = role === 'admin';
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

