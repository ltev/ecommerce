import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  // Subject - subclass of Observable. Used to publish events that will be send to all of the subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    // check if already in cart
    let existingCartItem: CartItem | undefined = this.cartItems.find(tempCartItem => tempCartItem.id == cartItem.id);

    // check if found
    if (existingCartItem != undefined) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    // compute total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    // fixed 2 decimal places
    totalPriceValue = Number(totalPriceValue.toFixed(2));

    // publish new values. All subscribers will receive the new data
    // .next(...) - publish / send event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log data
    console.log(`Cart data: totalValue=${totalPriceValue}, totalQuantity=${totalQuantityValue}`);
  }

  removeItem(cartItem: CartItem) {
    let itemIdx = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);
    if (itemIdx != -1) {
      this.cartItems.splice(itemIdx, 1);
      this.computeCartTotals();
    }
  }
}
