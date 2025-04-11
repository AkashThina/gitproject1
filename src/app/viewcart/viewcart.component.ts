import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../services/sample.service';
import { CommonModule } from '@angular/common';
import { Product } from '../productlist/productlist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewcart',
  imports: [CommonModule],
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css'] 
})
export class ViewcartComponent {
  @Input() product!: Product;
  @Output() updateQuantity = new EventEmitter<number>();
  @Input() productQuantity: number = 1; 
  cartItems: Product[] = []; 
  totalPrice: number = 0;
  totalItems: number = 0;

  

  constructor(public cartService: ProductService,private route : Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.cartItems = this.cartService.getCartItems(); 
      this.calculateTotalPrice();
      
    }, 0);
    console.log("Cart Items in ViewCartComponent:", this.cartItems);
  
  }

  increaseQuantity(item: Product) {
    if (item.rating && item.rating.count > 0) {
      item.quantity = (item.quantity ?? 1) + 1;  
      item.rating.count--;  

      this.updateCartItem(item);
      this.updateQuantity.emit(item.quantity);
    } else {
      console.log("Out of stock! Cannot increase quantity.");
    }
  }

  decreaseQuantity(item: Product) {
    if (item.quantity && item.quantity > 1) {
      item.quantity--;  
      if (item.rating) {
        item.rating.count++;  
      }
      this.updateCartItem(item);
      this.updateQuantity.emit(item.quantity);
    }
  }

  removeFromCart(productId: number | undefined) {
    if (!productId) {
      console.log("Invalid product ID");
      return;
    }
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice(); 
  }

  updateCartItem(updatedProduct: Product) {
    const index = this.cartItems.findIndex(item => item.id === updatedProduct.id);
    if (index !== -1) {
      this.cartItems[index] = { ...updatedProduct }; 
      this.cartService.saveCartToStorage();  
      this.calculateTotalPrice(); 
    }
  }
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity ?? 1));
    }, 0);
    this.totalItems = this.cartItems.reduce((total, item) => total + (item.quantity ?? 1), 0);
    console.log("Updated Total Price:", this.totalPrice);
  }


  login() {
      this.route.navigate(["/payment"]); // Redirect to payment page if logged in
    
    }
  }
   
      