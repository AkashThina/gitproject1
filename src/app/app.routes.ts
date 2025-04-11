import { Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { EditprofileComponent } from './editprofile/editprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    {path:'',component:ProductlistComponent},
    {path:'viewcart',component:ViewcartComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'edit',component:EditprofileComponent, canActivate: [authGuard] },
    {path:'payment',component:PaymentComponent, canActivate: [authGuard] },
    
];

