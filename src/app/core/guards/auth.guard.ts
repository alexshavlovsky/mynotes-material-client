import {Injectable} from '@angular/core';
import {AbstractAuthGuard} from './abstract.auth.guard';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Router} from '@angular/router';
import {isTokenPresent} from '../../store/principal/principal.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends AbstractAuthGuard {
  constructor(protected store: Store<AppState>,
              protected router: Router) {
    super(store, router, isTokenPresent);
  }

}
