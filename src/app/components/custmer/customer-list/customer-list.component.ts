import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Customer } from '../../../models/customer.model';
import { Observable } from 'rxjs';
import { CreateCustomer, GetCustomer, CustomerState, DeleteCustomers } from '../state';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerListComponent implements OnInit {
  private showDeleteMessage: boolean;
  createCustomerForm: FormGroup;

  @Select(CustomerState.getCustomers) customers: Observable<Customer[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetCustomer());
  }
  removeProduct(productId: string) {
    if (confirm(`Are you sure to Delete this ${productId} ?`)) {
      this.store.dispatch(new DeleteCustomers(productId));
      this.showDeleteMessage = true;
      setTimeout(() => (this.showDeleteMessage = false), 3000);
    }
  }
}
