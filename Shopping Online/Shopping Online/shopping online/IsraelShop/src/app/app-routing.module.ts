import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { SuccessComponent } from './success/success.component';
import { GuardGuard } from './auth/guard.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'shopping', component: ShoppingComponent, canActivate: [GuardGuard] },
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [GuardGuard] },
  { path: 'success', component: SuccessComponent, canActivate: [GuardGuard] },
  { path: '404', component: Page404Component },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
