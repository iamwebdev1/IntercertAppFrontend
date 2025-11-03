import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MainLayout } from './layouts/main-layout/main-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainLayout
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
  isAuthenticated = false;

  constructor(private router: Router) {
    // ✅ Only listen to NavigationEnd events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const token = localStorage.getItem('token');
        const currentUrl = event.urlAfterRedirects;

        // ✅ Show layout only when logged in
        this.isAuthenticated =
          !!token && !['/login', '/signup'].includes(currentUrl);
      });
  }
}
