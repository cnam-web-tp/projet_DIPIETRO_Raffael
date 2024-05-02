import { Routes } from '@angular/router';
import { RegisterPageComponent } from './features/authentication/register-page/register-page.component';
import { LoginPageComponent } from './features/authentication/login-page/login-page.component';
import { ProfilePageComponent } from './features/authentication/profile-page/profile-page.component';
import { TramwaysPageComponent } from './features/tramways/tramways-page/tramways-page.component';
import { CartPageComponent } from './features/cart/cart-page/cart-page.component';

export const routes: Routes = [
  { path: '', component: TramwaysPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'tramways', component: TramwaysPageComponent },
  { path: 'cart', component: CartPageComponent }
];
