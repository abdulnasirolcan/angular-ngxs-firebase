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
  UpdateFormCustomer,
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
    console.log("action::::::",state);
    ctx.patchState({
      customers: state.customers.filter(customer  => customer.id === action.id)
    });
    return state.customers;
  }
  @Action(UpdateFormCustomer)
  update({ getState, patchState }: StateContext<CustomerStateModel>, { payload }: UpdateFormCustomer) {
    this.customerService.updateProduct(payload.id, payload.name, payload.email, payload.address, payload.phone).then(
      () => {
        console.log(`Update Success This  ${payload.name}`);
        patchState({
          customers: getState().customers.map(customer => {
            if (customer.id === payload.id) {
              customer.name = payload.name;
              customer.email = payload.email;
              customer.address = payload.address;
              customer.phone = payload.phone;
            }
            return customer;
          }),
        });
      },
      err => {
        throw new Error(err);
      },
    );
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
          customers: getState().customers.filter(customer => customer.id !== productId),
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
