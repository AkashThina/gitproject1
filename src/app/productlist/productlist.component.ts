import { Component, OnInit, SimpleChanges, OnChanges, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/sample.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  rating?: {
    rate: number;
    count: number;
  };
  quantity?: number;
  totalPrice?: number;
}

@Component({
  selector: 'app-productlist',
  imports: [FormsModule, CommonModule, ProductCardComponent],
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit, OnChanges {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  selectedProduct: Product | null = null;
  productQuantity: number = 1;
  cartItems: Product[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  isSidebarDisabled: boolean = false;
  selectedRating: number = 0;
  RatingHide:boolean=true

  constructor(public cartService: ProductService) {}

  ngOnInit() {
    this.loadProductsFromLocalStorage();
    this.loadCartItems();
    this.cartItems = this.cartService.getCartItems();

    if (!this.products.length) {
      this.fetchProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges - Input properties changed:', changes);
    if (changes['searchTerm']) {
      this.filterProductsBySearch();
    }
  }

  // ngAfterViewInit() {
  //   console.log('ngAfterViewInit - Product list UI fully loaded');
  // }

  // ngAfterViewChecked() {
  //   console.log('ngAfterViewChecked - Product list UI updated');
  // }

  // ngAfterContentInit() {
  //   console.log('ngAfterContentInit - Child content (ProductCardComponent) projected');
  // }

  // ngAfterContentChecked() {
  //   console.log('ngAfterContentChecked - Child content updated');
  // }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      this.products = data;
      this.filteredProducts = [...data];

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('products', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  loadProductsFromLocalStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedData = localStorage.getItem('products');
      if (storedData) {
        const parsedData: Product[] = JSON.parse(storedData);
        this.products = parsedData;
        this.filteredProducts = [...parsedData];
      }
    }
  }

  filterProducts() {
    let filtered = [...this.products];
    if (this.selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
    this.sortProducts(filtered);
  }

  sortProducts(productsList: Product[]) {
    productsList.sort((a, b) => {
      return this.sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    this.filteredProducts = [...productsList];
  }

  sortByName(order: 'asc' | 'desc') {
    this.sortOrder = order;
    this.filterProducts();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  filterProductsBySearch() {
    this.filterProducts();
  }

  

  showDetails(product: Product) {
    this.selectedProduct = product;
    this.productQuantity = 1;
    this.isSidebarDisabled = true;
    this.RatingHide=false
  }

  hideDetails() {
    this.selectedProduct = null;
    this.isSidebarDisabled = false;
    this.RatingHide = true
  }

  sortByPrice(order: 'asc' | 'desc') {
    let sortedProducts = [...this.filteredProducts];
    sortedProducts.sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    this.filteredProducts = [...sortedProducts];
  }

  addToCart(product: Product): void {
    const productQuantity = product.quantity ?? 1; 
    const productTotalPrice = productQuantity * product.price; 
  
    
    const existingProductIndex = this.cartItems.findIndex(item => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      const existingProduct = this.cartItems[existingProductIndex];
      existingProduct.quantity = (existingProduct.quantity ?? 0) + productQuantity; 
      existingProduct.totalPrice = existingProduct.quantity * existingProduct.price; 
      alert('Product is already added');
    } else {
      
      this.cartItems.push({ ...product, quantity: productQuantity, totalPrice: productTotalPrice });
      alert('Product added to cart successfully');
    }
  
    this.saveCartToStorage(); 
  }
  

  getCartItems() {
    return this.cartService.getCartItems();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
  }

  // updateQuantity(newQuantity: number) {
  //   this.productQuantity = newQuantity;
  // }

   saveCartToStorage() {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
  

setRating(rating: number) {
  this.selectedRating = rating;
  this.filterProductsByRating();
}

filterProductsByRating() {
  this.filteredProducts = this.products.filter(p => p.rating?.rate && Math.floor(p.rating.rate) === this.selectedRating);
}
showAllProducts() {
  this.selectedRating = 0
  this.filteredProducts = [...this.products]; 
}
}
