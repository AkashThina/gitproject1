import { Injectable} from '@angular/core';
import { Product } from '../productlist/productlist.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartItems: Product[] = [];
  cartKey = 'cartItems';
  isLogin = false; 
  userName: any =''
  showNavbar: boolean = true;

 
  showNav(){
    return this.showNavbar = true
  }
  login(): void {
    this.isLogin = true; 
  }

  logout(): void {
    alert("Logout Successfully");
    this.isLogin = false; 
    this.userName = '';
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
  } 

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }
  

  getUserName(): string {
    return localStorage.getItem('userName') || '' ;
  }

  constructor() {
    if (this.isLocalStorageAvailable()) {
      this.cartItems = this.loadCartFromStorage();
    }
  }

  getCurrentUser(){
    let data = JSON.parse(localStorage.getItem('Loginuser') || 'null')
    return data.name
  }

  getCurrentEmail(){
    let data = JSON.parse(localStorage.getItem('Loginuser') || 'null')
    return data.email
  } 

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadCartFromStorage(): Product[] {
    if (this.isLocalStorageAvailable()) {
      const storedCart = localStorage.getItem(this.cartKey);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  }

  saveCartToStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    }
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.saveCartToStorage();
    alert('Product added successfully');
    console.log('Cart Updated:', this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToStorage();
    console.log('Item removed. Updated Cart:', this.cartItems);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }
  
  cartItemCount(): number {
    return this.isLocalStorageAvailable() ? this.cartItems.length : 0;
  }
}
