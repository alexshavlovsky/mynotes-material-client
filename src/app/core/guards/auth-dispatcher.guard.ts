import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {isTokenAbsent} from '../../store/principal/principal.selectors';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthDispatcherGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    // all routes except the '/' route are activated
    if (state.url !== '/') return true;
    // the '/' route is redirected based on specified conditions
    // if an auth token is absent then it redirects to the 'auth' route
    // TODO: otherwise it should redirect to a default route based on the current user role
    return this.store.pipe(
      select(isTokenAbsent),
      take(1),
      map(t => this.router.createUrlTree([t ? 'auth' : 'notebooks'])
      ),
    );
  }

}
