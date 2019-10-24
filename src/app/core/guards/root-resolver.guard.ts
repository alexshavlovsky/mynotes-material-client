import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {tokenDecoded} from '../../store/principal/principal.selectors';
import {map, take} from 'rxjs/operators';
import {RouteUrls} from '../../app-routing.config';

@Injectable({
  providedIn: 'root'
})
export class RootResolverGuard implements CanActivate {

  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (state.url !== '/') return true; // activate error component
    // the root url is redirected based on specified conditions
    return this.store.pipe(
      select(tokenDecoded),
      take(1),
      map(t => {
          // not authenticated user is redirected to the auth container
          if (t === null) return this.router.createUrlTree([RouteUrls.AUTH_CONTAINER]);
          // authenticated user is redirected to a default route
          let redirect = t.defaultRoute;
          if (redirect === undefined || redirect === '') redirect = RouteUrls.ERROR;
          return this.router.createUrlTree([redirect]);
        }
      ),
    );
  }

}
