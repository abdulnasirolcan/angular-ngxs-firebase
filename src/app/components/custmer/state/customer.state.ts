import { ApplicationRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import {
  CreateCustomer,
  GetCustomer,
  UpdatedCustomer,
  GetUpdatedCustomers,
  DataChanged,
  DeleteCustomers,
} from './customer.actions';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';

export class CustomerStateModel {
  public customers: Customer[];
}

@State<CustomerStateModel>({
  name: 'customers',
  defaults: {
    customers: [],
  },
})
export class CustomerState {
  constructor(private store: Store, private customerService: CustomerService) {}
  @Selector()
  static userByIndex(state: any[]) {
    return id => {
      let index = state.findIndex(x => x.id == id);
      console.log(index);
      return state[index];
    };
  }
  /**
   * Selectors
   */
  @Selector()
  static getCustomers(state: CustomerStateModel) {
    return state.customers;
  }

  @Action(DataChanged)
  async changeRoute(context: StateContext<string>, action: DataChanged) {
    context.setState(action.data);
  }

  @Action(CreateCustomer)
  add({ getState, patchState }: StateContext<CustomerStateModel>, { payload }: CreateCustomer) {
    const state = getState();
    return this.customerService.addProduct(payload.name, payload.email, payload.address, payload.phone).then(
      () => console.log('Customer Send'),
      err => {
        throw new Error(err);
      },
    );
  }

  @Action(GetCustomer)
  getProducts({ getState, patchState }: StateContext<CustomerStateModel>) {
    this.customerService.getAddedProducts().subscribe(customers => {
      const state = getState();
      // patchState({ customers: [...state.customers, ...customers] });
      patchState({ customers: [...customers] });
      //patchState({ customers });
    });
  }

  @Action(UpdatedCustomer)
  updateCustomer(ctx: StateContext<CustomerStateModel>, action: UpdatedCustomer) {
    const state = ctx.getState();
    ctx.patchState({
      customers: state.customers.filter(({ id }) => id === action.id),
    });
  }

  @Action(GetUpdatedCustomers)
  updatedProducts({ getState, patchState }: StateContext<CustomerStateModel>) {
    this.customerService.getUpdatedProducts().subscribe(productList => {
      productList.forEach(updatedProduct => {
        patchState({
          customers: getState().customers.map(product => {
            if (product.id === updatedProduct.id) {
              return updatedProduct;
            } else return product;
          }),
        });
      });
    });
  }

  @Action(DeleteCustomers)
  remove({ getState, patchState }: StateContext<CustomerStateModel>, { productId }: DeleteCustomers) {
    const state = getState();
    this.customerService.removeProduct(productId).then(
      () => {
        console.log(`Delete Success This  ${productId}`);
        patchState({
          customers: getState().customers.filter(customer=>customer.id!==productId)
        });
      },
      err => {
        throw new Error(err);
      },
    );
  }

  // @Action(UpdatedCustomer)
  // updatedProducts({ getState, patchState }: StateContext<CustomerStateModel>) {
  //   this.customerService.getUpdatedProducts().subscribe(customerList => {
  //     customerList.forEach(updatedCustomer => {
  //       patchState({
  //         customers: getState().customers.map(customer => {
  //           if (customer.id === updatedCustomer.id) {
  //             return updatedCustomer;
  //           } else return customer;
  //         }),
  //       });
  //     });
  //   });
  // }
}
