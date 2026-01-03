import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-backoffice';
  constructor(private router: Router) {}

  // Metodo per verificare se siamo nella pagina di login
  isLoginPage(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/login');
  }
}