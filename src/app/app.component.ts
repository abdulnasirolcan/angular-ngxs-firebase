import { Component} from '@angular/core';
import { Actions, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginState } from './components/login/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Select(LoginState.getInitialized)
  initialized$: Observable<boolean>;
}
