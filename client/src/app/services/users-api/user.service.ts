import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  
  // POST PRODUCTS TO CART
  postUser(name, email, password, repeatPassword) {
    return this.http.post(this.url, { name, email, password });
  }
}
