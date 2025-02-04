import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  standalone: false,

  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  get cartItems(): CartItem[] {
    return this.cartService.cartItems;
  }

  listCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute totals
    this.cartService.computeCartTotals();
  }

  increaseQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 0) {
      cartItem.quantity--;
      this.cartService.computeCartTotals();
    }
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }
}
