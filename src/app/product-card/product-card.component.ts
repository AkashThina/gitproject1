import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../productlist/productlist.component';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnDestroy {
  title:string = ''
  @Input() product!: Product;
  @Input() productQuantity: number = 1;  
  @Output() detailsClicked = new EventEmitter<Product>(); 
  @Output() backClicked = new EventEmitter<void>();
  @Output() addToCartEvent = new EventEmitter<Product>();
  @Output() updateQuantity = new EventEmitter<number>();
  showDetails(event: Event) {
    event.stopPropagation();
    this.detailsClicked.emit(this.product);  
  }

  increaseQuantity() {
    this.productQuantity++; 
    this.updateQuantity.emit(this.productQuantity); 
  }

  decreaseQuantity() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
      this.updateQuantity.emit(this.productQuantity); 
    }
  }

  addToCart() {
    console.log("Added to Cart:", this.product);
    this.addToCartEvent.emit(this.product);
  }

  goBack() {
    this.backClicked.emit();
  }
  ngOnDestroy() {
    console.log('ngOnDestroy - Component destroyed');
  }
}