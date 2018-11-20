import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from '../../product/state/product.state';
import { Product } from '../../../models/product.model';
import { Observable, of as observableOf, merge } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getProducts) stateProducts$: Observable<Product[]>;
  constructor() {}

  ngOnInit() {}
}
