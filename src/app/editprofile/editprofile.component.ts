import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
   changeDetection:ChangeDetectionStrategy.OnPush
})
export class EditprofileComponent implements OnInit {
  editProfile: FormGroup;
  showPassword: boolean = false;
  currentUser: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.editProfile = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)]],
      password: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[\W])(?=.*\d?).{6,}$/)]],
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('Loginuser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);

      this.editProfile.patchValue({
        name: this.currentUser?.name || '',
        email: this.currentUser?.email || '',
        password: this.currentUser?.password || ''
      });

      console.log("Initial Form Values:", this.editProfile.value);
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onUpdateProfile(): void {
    if (this.editProfile.valid) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      let updatedUsers = users.map((user: any) => {
        if (user.email === this.currentUser.email) {
          return {
            ...user,
            name: this.editProfile.value.name,
            email: this.editProfile.value.email,
            password: this.editProfile.value.password
          };
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('Loginuser', JSON.stringify({ ...this.editProfile.value }));

      alert("Profile updated successfully!");
      this.router.navigate(['']);
    }
  }
}
