import { CanActivateFn, Router } from '@angular/router';
import { ProductService } from '../services/sample.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ProductService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Allow access if the user is logged in
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false;
  }
};
