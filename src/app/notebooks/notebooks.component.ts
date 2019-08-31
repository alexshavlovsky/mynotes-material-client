import {Component, OnInit} from '@angular/core';
import {AppState} from '../store';
import {Store} from '@ngrx/store';
import {Logout} from '../store/principal/principal.actions';
import {RouterOutlet} from '@angular/router';
import {notebooksRoutingAnimation} from './notebooks-routing.animation';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css'],
  animations: [notebooksRoutingAnimation]
})
export class NotebooksComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnInit() {
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
