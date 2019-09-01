import {Component, OnInit} from '@angular/core';
import {AppState} from '../store';
import {Store} from '@ngrx/store';
import {Logout} from '../store/principal/principal.actions';
import {AppPropertiesService} from '../core/services/app-properties.service';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css'],
})
export class NotebooksComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private appProps: AppPropertiesService) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
