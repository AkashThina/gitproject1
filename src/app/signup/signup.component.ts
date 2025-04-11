import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
// import { ProductService } from '../services/sample.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  
  signupForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formB: FormBuilder, private router: Router) {
    this.signupForm = this.formB.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z ]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[\W])(?=.*\d?).{6,}$/)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmitSignUp() {
    try {
      if (this.signupForm.valid) {
        const userData = this.signupForm.value;
        let users = JSON.parse(localStorage.getItem('users') || '[]');

        const existingUser = users.find((user: any) => user.email === userData.email);
        if (existingUser) {
          throw new Error('This email is already registered. Please use a different email.');
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Sign Up Successful', userData.name);
        this.router.navigate(['/login']);
        throw new Error('Account created successfully! Redirecting to login.');
      } 
    } catch (error: any) 
    {
        alert(error.message);
    }
  }
}
