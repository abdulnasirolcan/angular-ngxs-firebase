import { Component, OnInit, Input } from '@angular/core';
import {
  Customer,
  UpdatedCustomer,
  CreateCustomer,
  CustomerState,
  DataChanged,
  GetCustomer,
  GetUpdatedCustomers,
} from '../state';
import { Store, Select, Selector } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  @Select(CustomerState.getCustomers) customers: Observable<Customer[]>;
  @Input() customer: Customer;
  createCustomerForm: FormGroup;
  showAddMessage: boolean;
  id: any;
  constructor(
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private customerService: CustomerService,
  ) {
    this.createCustomer();
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.store.dispatch(new UpdatedCustomer(this.id));
  }
  createCustomer = () => {
    this.createCustomerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  };
  // editCustomer = id => {
  //   this.store.dispatch(new UpdatedCustomer(id));
  // };

  saveCustomer = (name, email, address, phone) => {
    if (confirm(`Are you sure to Add this ${name} ?`)) {
      this.store.dispatch(
        new CreateCustomer({
          name: name,
          email: email,
          address: address,
          phone: phone,
        }),
      );
      this.showAddMessage = true;
      setTimeout(() => (this.showAddMessage = false), 3000);
    }

    //this.createCustomerForm.reset();
    this.store.dispatch(new Navigate(['/customer']));
  };
}
