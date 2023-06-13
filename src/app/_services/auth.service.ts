import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://volunteer-management-backend.onrender.com/users/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'login',
      { email, password },
      { headers: this.getHeaders() }
    );
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    const token = localStorage.getItem('jwtToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private storeToken(token: string): void {
    // Store the token in localStorage or a secure cookie
    // Example using localStorage:
    localStorage.setItem('jwtToken', token);
  }

  // register(
  //   email: string, 
  //   password: string, 
  //   name:string,
  //   lastname:string,
  //   nickname:string,
  //   birthday: Date,
  //   gender: string,
  //   religion: string,
  //   phoneNumber: string,
  //   career: string,
  //   workplace: string,
  //   congenitalDisease: string,
  //   allergicFood: string,
  //   talent: string,
  //   know_from: string
  //   ): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'register',
  //     {
  //       email, 
  //       password,
  //       name, 
  //       lastname, 
  //       nickname, 
  //       birthday, 
  //       gender, 
  //       religion, 
  //       phoneNumber, 
  //       career, 
  //       workplace, 
  //       congenitalDisease, 
  //       allergicFood, 
  //       talent, 
  //       know_from
  //     },
  //     httpOptions
  //   );
  // }

  // emailResetPassWord(email:string): Observable<any> {
  //   return this.http.post('http://localhost:8000/users/password-reset',{email},httpOptions);
  // }

  // confirmResetPassWord(password:string): Observable<any> {
  //   return this.http.post('http://localhost:8000/users/reset-password',{password},httpOptions);
  // }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'logout', { }, httpOptions);
    
  // }

  // refreshToken() {
  //   return this.http.post(AUTH_API + 'refreshtoken', { }, httpOptions);
  // }
}
