import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoginState, Logout, User } from '../../components/login/state/';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @Select(LoginState.getUser)
  public user$: Observable<User>;
  constructor(private store: Store) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
