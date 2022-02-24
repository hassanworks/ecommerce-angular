import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  loginDetails: string;
  products: any[];
  sumOfProducts: number;
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.decodeToken();
    this.getCartItemById();
  }

  // Get cart items by ud
  getCartItemById() {
    this.cart.getSingleItemFromCart(this.loginDetails).subscribe((data) => {
      let arr = data;
      this.sumOfProducts = arr[0]?.sumOfProducts;
      this.products = arr[0]?.products.map((el) => el);
    });
  }

  // Decode token
  decodeToken() {
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.loginDetails = decoded.userId;
  }
  displayedColumns: string[] = ['name', 'inCart', 'price'];
}
