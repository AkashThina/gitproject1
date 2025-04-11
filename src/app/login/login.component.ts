import { CommonModule } from '@angular/common';
import { Component,Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/sample.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  title:string ='Log in'
  user = { email: '', password: '' };
  errorMessage: string = '';

  constructor(public cartService: ProductService, private router: Router) {}

  onSubmitLogin() {
    this.errorMessage = '';

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Find user by email
      let existingUser = users.find((u: any) => u.email === this.user.email);

      if (!existingUser) {
        this.errorMessage = 'User not found';
        return;
      }

      // Validate password
      if (existingUser.password !== this.user.password) {
        this.errorMessage = 'Invalid password';
        return;
      }
      const token = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"
      // Successful login
      localStorage.setItem('Loginuser', JSON.stringify(existingUser));
      localStorage.setItem('token', token);
      this.cartService.login();
      alert('Login Successful');
      this.router.navigate(['']);
      console.log('Login Successful');
      

    } catch (error) {
      this.errorMessage = 'An unexpected error occurred';
    }
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  // private generateFakeJWT(email: string): string {
  //   const fakePayload = {
  //     email: email,
  //     role: email === 'admin@example.com' ? 'admin' : 'user',
  //   };
  //   return btoa(JSON.stringify(fakePayload));
  // }
  goBack() {
    this.cartService.showNav() // Show navbar when closing the login form
    this.router.navigate(['']); // Navigate back to the homepage
  }
}
