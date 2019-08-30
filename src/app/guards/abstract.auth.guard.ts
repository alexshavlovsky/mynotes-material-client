import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from "../store";
import {MemoizedSelector, select, Store} from "@ngrx/store";
import {take, tap} from "rxjs/operators";

export abstract class AbstractAuthGuard implements CanLoad, CanActivate {

  protected constructor(protected store: Store<AppState>,
                        protected router: Router,
                        protected selector: MemoizedSelector<object, boolean>) {
  }

  // Why use take(1)? Look at the link below:
  // https://stackoverflow.com/questions/46040890/why-do-angular-guards-behave-differently-when-using-select-from-angular-redux
  allowOrRedirect$ = this.store.pipe(
    select(this.selector),
    take(1),
    tap(t => {
      // all redirects are handled by AuthDispatcherGuard which listens on the '/' route
      // so we navigate to the '/' url
      if (!t) this.router.navigate(['/'])
    })
  );

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.allowOrRedirect$;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.allowOrRedirect$;
  }

}
