import {Component, OnInit} from '@angular/core';
import {AppState} from '../store';
import {Store} from '@ngrx/store';
import {Logout} from '../store/principal/principal.actions';
import {AppPropertiesService} from '../core/services/app-properties.service';
import {userDetails} from '../store/principal/principal.selectors';
import {Observable} from 'rxjs';
import {UserRegisterResponse} from '../auth/model/user-register-response.model';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css'],
})
export class NotebooksComponent implements OnInit {
  user$: Observable<UserRegisterResponse> = this.store.select(userDetails);

  constructor(private store: Store<AppState>,
              private appProps: AppPropertiesService) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
