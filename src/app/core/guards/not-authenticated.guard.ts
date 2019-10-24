import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Router} from '@angular/router';
import {AbstractRoleGuard} from './abstract.role.guard';

@Injectable({
  providedIn: 'root'
})
export class NotAuthenticatedGuard extends AbstractRoleGuard {

  constructor(protected store: Store<AppState>,
              protected router: Router) {
    super(store, router, t => t === null ? null : t.defaultRoute);
  }

}
