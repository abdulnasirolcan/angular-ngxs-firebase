import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

//Routing
import { AppRoutingModule } from './app-routing.module';

//NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
//State
import { LoginState } from './components/login/state/login.state';

//Config
import { environment } from '../environments/environment';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from './components/login/state/auth.guard';
import { CustomerService } from './services/customer.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ProductState } from './components/product/state';
import { ProductService } from './services/product.service';
import { EditCustomerComponent } from './components/custmer/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './components/custmer/add-customer/add-customer.component';
import { CustomerListComponent } from './components/custmer/customer-list/customer-list.component';
import { CustomerState } from './components/custmer/state/customer.state';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductListComponent,
    CreateProductComponent,
    EditProductComponent,
    EditCustomerComponent,
    AddCustomerComponent,
    CustomerListComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxsModule.forRoot([LoginState, ProductState, CustomerState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.email'],
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  providers: [AuthGuard, CustomerService, ProductService, AngularFireDatabase, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
