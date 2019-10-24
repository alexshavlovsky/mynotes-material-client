import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Router} from '@angular/router';
import {AbstractRoleGuard} from './abstract.role.guard';
import {RouteUrls} from '../../app-routing.config';

@Injectable({
  providedIn: 'root'
})
export class HasRoleAdminGuard extends AbstractRoleGuard {

  constructor(protected store: Store<AppState>,
              protected router: Router) {
    super(store, router, t => t === null ? RouteUrls.AUTH_CONTAINER : t.hasRoleAdmin ? null : t.defaultRoute);
  }

}
