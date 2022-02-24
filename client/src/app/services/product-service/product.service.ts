import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // GET ALL PRODUCTS
  getData() {
    return this.http.get(this.url);
  }

  // GET PRODUCTS BY CATEGORY
  getDataByCategory(cat) {
    let url = `${this.url}/${cat}`;
    return this.http.get(url);
  }
}
