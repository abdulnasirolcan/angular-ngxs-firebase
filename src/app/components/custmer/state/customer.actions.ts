import { Customer } from '../../../models/customer.model';

export const CREATE_CUSTOMER = 'Customer_Create';
export const UPDATE_CUSTOMER = 'Customer_Update';
export const DELETE_CUSTOMER = 'Customer_Delete';
export const GET_CUSTOMER = 'Customer_Get';
export const GET_UPDATE_CUSTOMER = 'Get_Updated_Customer';
export const DATA_CHANGEDER = 'Data_Changeder';

export class CreateCustomer {
  static readonly type = CREATE_CUSTOMER;
  constructor(public payload: Customer) {}
}
export class GetCustomer {
  static readonly type = GET_CUSTOMER;
}

export class UpdatedCustomer {
  static readonly type = UPDATE_CUSTOMER;
  constructor(public id: string) {}
}
export class GetUpdatedCustomers {
  static readonly type = GET_UPDATE_CUSTOMER;
}

export class DataChanged {
  static readonly type = DATA_CHANGEDER;
  constructor(public data: any) {}
}

export class DeleteCustomers {
  static readonly type = DELETE_CUSTOMER;
  constructor(public productId: string) {}
}
