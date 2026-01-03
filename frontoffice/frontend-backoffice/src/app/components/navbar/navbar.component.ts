import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logo: string = "/backend.png";
  logoWidth: number = 30;
  logoHeigth: number = 30;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    console.log('Logout in corso...');

    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    }, 2000);
  }


  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

}
