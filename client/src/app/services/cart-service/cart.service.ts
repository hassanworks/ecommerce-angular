import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = `http://localhost:3000/cart`;

  constructor(private http: HttpClient) {}

  // GET ONE ITEM FROM CART VIA ID
  getSingleItemFromCart(userId) {
    let url = `${this.url}/${userId}`;
    return this.http.get(url);
  }

  // POST DATA TO CART
  postDataToCart(userId, products, sumOfProducts) {
    return this.http.post(this.url, { userId, products, sumOfProducts });
  }

  // UPDATE DATA TO CART VIA ID
  updateCartData(userId, products, sumOfProducts) {
    let url = `${this.url}`;
    return this.http.put(url, { userId, products, sumOfProducts });
  }
}
