import { Component } from '@angular/core';
import { ProductService } from '../services/sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  constructor(private cartService:ProductService,private router : Router){}
  goBack() {
    this.cartService.showNav() // Show navbar when closing the login form
    this.router.navigate(['']); // Navigate back to the homepage
  }
}
