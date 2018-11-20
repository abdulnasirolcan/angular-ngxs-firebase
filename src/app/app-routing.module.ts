import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/login/state/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CustomerListComponent } from './components/custmer/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/custmer/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/custmer/edit-customer/edit-customer.component';
import { Customer } from './models/customer.model';
// import { AuthenticatedGuard } from './auth';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'add-customer', component: AddCustomerComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-customer/:id',
    component: AddCustomerComponent,
    canActivate: [AuthGuard],
    // data: { customer: Customer },
  },
  //{ path: 'page', loadChildren: './page/page.module#PageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
