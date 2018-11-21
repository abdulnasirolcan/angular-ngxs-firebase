import { Component, OnInit, Input } from '@angular/core';
import {
  Customer,
  UpdatedCustomer,
  CustomerState,
  DataChanged,
  GetCustomer,
  GetUpdatedCustomers,
  UpdateFormCustomer,
} from '../state';
import { Store, Select, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  customer: Observable<Customer[]>;
  id: any;
  updateCustomerForm: FormGroup;
  showAddMessage: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private customerService: CustomerService,
  ) {
    // this.id = route.snapshot.params['id'];
    // let product = this.customerService.getUpdatedProducts();
    // this.subscribeToDataChanges();
    //this.createCustomer();
    this.updateCustomer();
  }

  updateCustomer = () => {
    this.updateCustomerForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  };

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    if (this.id) {
      this.customer = this.store.dispatch(new UpdatedCustomer(this.id));
      this.updateCustomer();
    }
    // this.id = this._route.snapshot.params['id'];
    // this.store.dispatch(new UpdatedCustomer(this.id));
    //this.customer = customers.findIndex(p => p.productID == this.id);
    //this.customers = this.store.select(CustomerState.userByIndex).pipe(map(filterFn => filterFn(this.id)));
    //this.route.params.subscribe(customer => (this.customer = customer.customer));
    // this.customer = this.route.snapshot.params.customer;
    // console.log(this.customer);
    // this.route.params.subscribe(params => {
    //   console.log(params.customer);
    //   this.customer = params.customer;
    // });
  }
  // private subscribeToDataChanges() {
  //   this.router.events
  //     .pipe(
  //       filter(event => event instanceof NavigationEnd),
  //       map(() => this._route),
  //       map(route => {
  //         while (route.firstChild) {
  //           route = route.firstChild;
  //         }
  //         return route;
  //       }),
  //       filter(route => route.outlet === 'primary'),
  //       mergeMap(route => route.data),
  //     )
  //     .subscribe(d => {
  //       this.store.dispatch(new DataChanged(d));
  //     });
  // // }
  // updateSaveCustomer = (name, email, address, phone) => {
  //   if (this.createCustomerForm.valid) {
  //     if (confirm(`Are you sure to Add this ${name} ?`)) {
  //       this.store.dispatch(
  //         new UpdateFormCustomer({
  //           name: name,
  //           email: email,
  //           address: address,
  //           phone: phone,
  //         }),
  //       );
  //       this.showAddMessage = true;
  //       setTimeout(() => (this.showAddMessage = false), 3000);
  //     }
  //   }
  //   this.store.dispatch(new Navigate(['/customer']));
  // };
  updateSaveCustomer = id => {
    this.store.dispatch(new UpdatedCustomer(id));
  };
}
