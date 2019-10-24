import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {JwtTokenDetails} from '../services/auth.service';
import {tokenDecoded} from '../../store/principal/principal.selectors';

export abstract class AbstractRoleGuard implements CanLoad, CanActivate {

  protected constructor(protected store: Store<AppState>,
                        protected router: Router,
                        protected redirectStrategy: (t: JwtTokenDetails | null) => string | null) {
  }

  private allowOrRedirect$ = this.store.pipe(
    select(tokenDecoded),
    take(1),
    map(t => {
      const redirect = this.redirectStrategy(t);
      if (redirect !== null) this.router.navigate([redirect]);
      return redirect === null;
    })
  );

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.allowOrRedirect$;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.allowOrRedirect$;
  }

}
