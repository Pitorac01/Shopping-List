import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          const token = res.token;
          const payload = this.authService.decodeToken(token);

          console.log('Payload decodificato:', payload);

          if (payload && payload.groups && payload.groups.includes("IT-Amministrazione")) {
            console.log('Login riuscito, utente autorizzato');
            this.router.navigate(['/home']);
          } else {
            console.log('Accesso negato: gruppo non autorizzato ad accedere');
            alert('Non sei autorizzato ad accedere');
          }
        },
        error: (err) => {
          if (err.status === 404) {
            console.error('Utente non trovato:', err.error);
          } else {
            console.error('Errore chiamata:', err);
          }
        }
      });
    } else {
      console.log('Form non valido');
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}