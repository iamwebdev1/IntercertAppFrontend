import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AuthLayout,
    MainLayout
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isAuthenticated = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const token = localStorage.getItem('token');
        this.isAuthenticated =
          !!token && !['/login', '/signup'].includes(event.urlAfterRedirects);
      }
    });
  }
}