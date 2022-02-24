import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/services/product-service/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'All Products';
  closeResult = ''; // Used to close modal
  noOfItemsInCart: number; // Number of all items in cart
  sumOfProducts: any; // Sum of all items in cart
  dataFromProductsAPI: any[]; // All products from Products API
  productsInCart: any = []; // All products in cart
  productId: any = []; // stores all product ids
  myProductIdArray: any[] = []; // stores unique product ids
  myProductCartArray: any[]; // Get all cart items
  datafromCart: any[]; // Cart items those are displayed in modal in UI
  arrU = []; // Array pushed into cart API
  arrO = []; // Array used to store even duplicate values
  loginDetails; // User details of logged in user
  product: boolean = false; // Used to show product name in UI
  search: string; // Used for search pipe

  p: number = 1; // Used for pagination
  isCartUpdated = false;

  imageUrl = '../../../assets/uploads/';

  public constructor(
    private modalService: NgbModal,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProducts();
    this.decodeToken();
    this.getCartItemById();
  }

  decodeToken() {
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.loginDetails = decoded.userId;
  }

  // Get all products
  getProducts() {
    this.productService.getData().subscribe((data: any[]) => {
      this.dataFromProductsAPI = data;
    });
  }

  // Get cart by id
  getCartItemById() {
    this.cartService.getSingleItemFromCart(this.loginDetails).subscribe(
      (data: any) => {
        this.myProductCartArray = data;
        this.datafromCart = data[0]?.products.map((el) => {
          this.arrO.push({
            productDetail: el.productDetail._id,
            name: el.productDetail.name,
            price: el.price,
            inCart: el.inCart,
          });
          this.arrU.push({
            productDetail: el.productDetail._id,
            name: el.productDetail.name,
            price: el.price,
            inCart: el.inCart,
          });
          this.arrU.length ? (this.isCartUpdated = true) : false;
          return {
            productDetail: el._id,
            name: el.productDetail.name,
            price: el.price,
            inCart: el.inCart,
          };
        });
        this.count();
      },
      (err) => {}
    );
  }

  // MODAL STARTS HERE
  open(content) {
    this.cartPostApi(); //Post items to Cart
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // MODAL ENDS HERE

  // Increment item in cart in modal view
  increment(product) {
    const ogProduct = this.dataFromProductsAPI.find(
      (p) => p.name == product.name
    );
    let i = this.arrU.findIndex((a) => a.name === product.name);
    this.arrU[i].inCart += 1;
    this.arrU[i].price += ogProduct.price;
    let a = this.arrU[i].inCart * this.arrU[i].price;
    this.datafromCart = this.arrU;
    this.totalCost(ogProduct);
  }

  // Decrement item in cart in modal view
  decrement(product) {
    const ogProduct = this.dataFromProductsAPI.find(
      (p) => p.name == product.name
    );
    let i = this.arrU.findIndex((a) => a.name === product.name);
    if (this.arrU[i].inCart <= 1) {
      this.arrU.splice(i, 1);
      this.datafromCart = this.arrU;
    } else {
      this.arrU[i].inCart -= 1;
      this.arrU[i].price -= ogProduct.price;
      this.datafromCart = this.arrU;
    }
    this.totalCostDecrement(ogProduct);
  }

  // NUMBER OF ITEMS IN CART
  count() {
    let price = this.datafromCart
      ?.map((item) => parseInt(item.price))
      .reduce((prev, curr) => prev + curr, 0);
    this.sumOfProducts = price;

    let count = this.datafromCart
      ?.map((item) => item.inCart)
      .reduce((prev, curr) => prev + curr, 0);
    this.noOfItemsInCart = count;
  }

  // TOTAL COST
  totalCost = (product) => {
    if (this.sumOfProducts) {
      this.sumOfProducts += product.price;
    } else {
      this.sumOfProducts = product.price;
    }
  };

  // TOTAL COST AFTER DECREMENT
  totalCostDecrement = (product) => {
    if (this.sumOfProducts) {
      this.sumOfProducts -= product.price;
    } else {
      this.sumOfProducts = product.price;
    }
  };

  openSnackBar() {
    this._snackBar.open('Item added', null, {
      duration: 1000,
    });
  }

  // ADD ITEMS TO CART ON ADD TO CART
  addToCart = (product) => {
    if (this.noOfItemsInCart) {
      this.noOfItemsInCart += 1;
    } else {
      this.noOfItemsInCart = 1;
    }
    this.setItems(product);
    this.allItems();
    this.totalCost(product);
    this.openSnackBar();
  };

  // POST AND UPDATE CART API
  cartPostApi() {
    if (!this.isCartUpdated) {
      this.cartService
        .postDataToCart(this.loginDetails, this.arrU, this.sumOfProducts)
        .subscribe(
          (data) => {
            this.myProductCartArray.push({
              userId: this.loginDetails,
              products: this.arrU,
              sumOfProducts: this.sumOfProducts,
            });
            this.datafromCart = this.myProductCartArray[0].products.map(
              (el) => {
                return {
                  id: el._id,
                  name: el.name,
                  inCart: el.inCart,
                  price: el.price,
                };
              }
            );
          },
          (err) => {}
        );
    } else {
      if (this.product) {
        this.cartService
          .updateCartData(this.loginDetails, this.arrU, this.sumOfProducts)
          .subscribe(
            (data: any) => {
              this.datafromCart = this.arrU.map((el) => {
                return {
                  name: el.name,
                  inCart: el.inCart,
                  price: el.price,
                  productDetail: el._id,
                };
              });
            },
            (err) => {}
          );
      }
    }
  }

  // SET ITEMS ON ADD TO CART
  setItems(product) {
    this.product = true;
    this.productId.push(product._id);
    this.myProductIdArray = [...new Set(this.productId)];
    let quantity = this.arrO.filter((a) => a.name === product.name).length;
    if (quantity == 0) {
      this.arrU.push({
        productDetail: product._id,
        name: product.name,
        price: product.price,
        inCart: 1,
      });
      this.arrO.push(product);
    } else {
      let i = this.arrU.findIndex((a) => a.name === product.name);
      this.arrU[i].inCart += 1;
      this.arrU[i].price = this.arrU[i].inCart * product.price;
    }
  }

  // SHOW ALL ITEMS
  allItems() {
    this.productsInCart.forEach((item) => {
      this.setItems(item);
    });
  }

  // MOVE TO CHECKOUT PAGE
  checkout() {
    this.cartService
      .updateCartData(this.loginDetails, this.arrU, this.sumOfProducts)
      .subscribe(
        (data) => {},
        (err) => {}
      );
    this.router.navigate(['/checkout']);
    this.modalService.dismissAll();
  }

  displayedColumns: string[] = [
    'name',
    'price',
    'decrement',
    'inCart',
    'increment',
  ];
}
