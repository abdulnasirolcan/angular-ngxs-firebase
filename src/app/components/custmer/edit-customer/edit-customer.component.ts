import { Component, OnInit, Input } from '@angular/core';
import { Customer, UpdatedCustomer, CustomerState, DataChanged, GetCustomer, GetUpdatedCustomers } from '../state';
import { Store, Select, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit {
  @Select(CustomerState.getCustomers) customers: Observable<Customer[]>;
  customer: string;
  id: any;
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private customerService: CustomerService,
  ) {
    // this.id = route.snapshot.params['id'];
    // let product = this.customerService.getUpdatedProducts();
    // this.subscribeToDataChanges();
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.store.dispatch(new UpdatedCustomer(this.id));
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
  // }
}
