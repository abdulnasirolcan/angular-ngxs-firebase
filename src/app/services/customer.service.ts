import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../models/customer.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { from, Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private dbPath = 'customers/';
  customerList: AngularFireList<Customer[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getCustomers();
  }
  getCustomers() {
    this.customerList = this.firebase.list(this.dbPath);
    return this.customerList.snapshotChanges();
  }
  getAddedProducts(): Observable<Customer[]> {
    return this.af
      .collection<Customer>('customers')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            let customer = a.payload.doc.data() as Customer;
            customer.id = a.payload.doc.id;
            return customer;
          }),
        ),
      );
  }
  addProduct(name: string, email: string, address: string, phone: string): Promise<any> {
    const productCollection = this.af.collection<Customer>(this.dbPath);
    return productCollection.add({
      name: name,
      email: email,
      address: address,
      phone: phone,
    });
  }
  updateProduct(id: string, name: string, email: string, address: string, phone: string): Promise<any> {
    const productCollection = this.af.doc<Customer>(this.dbPath + id);
    return productCollection.update({
      name: name,
      email: email,
      address: address,
      phone: phone,
    });
  }
  getUpdatedProducts(): Observable<Customer[]> {
    return this.af
      .collection<Customer>(this.dbPath)
      .stateChanges(['modified'])
      .pipe(
        map(actions =>
          actions.map(a => {
            let customer = a.payload.doc.data() as Customer;
            customer.id = a.payload.doc.id;
            return customer;
          }),
        ),
      );
  }

  async removeProduct(id: string): Promise<any> {
    const productCollection = await this.af.doc<Customer>(this.dbPath + id);
    return productCollection.delete();
  }
}
