import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwt: string = '';

  constructor(private httpClient: HttpClient) {
    const savedToken = localStorage.getItem('jwt');
    if (savedToken) {
      this.jwt = savedToken;
    }
  }

  login(payload: { email: string, password: string }): Observable<any> {
    const url = `http://192.168.10.82:8080/auth/login`;
    return this.httpClient.post<any>(url, payload).pipe(
      tap((res) => {
        console.log('JSON ricevuto dal server:', res);

        this.jwt = res.token;
        localStorage.setItem('jwt', res.token);

      }),
      catchError((err) => {
        console.error('Error during login', err);
        alert('Error during login : ' + err.message);
        throw err;
      })
    );
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Errore decodifica token', e);
      return null;
    }
  }

  logout(): void {
    this.jwt = '';
    localStorage.removeItem('jwt');
    console.log('Logout effettuato');
  }

  isAuthenticated(): boolean {
    return this.jwt !== '';
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.jwt}`
    });
  }


}
