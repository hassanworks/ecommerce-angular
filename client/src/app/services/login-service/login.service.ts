import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  // POST ALL DATA TO LOGIN DB
  postLogin(email, password) {
    return this.http.post(this.url, { email, password });
  }

  // CHECK FOR LOGGEDIN USER VIA LOCALSTORAGE
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
