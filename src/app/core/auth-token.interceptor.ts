import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {PrincipalState} from '../store/principal/principal.reducer';
import {getToken} from '../store/principal/principal.selectors';
import {mergeMap, take, tap} from 'rxjs/operators';
import {HttpRequestRejected} from '../store/principal/principal.actions';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<PrincipalState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      take(1),
      mergeMap(token => next.handle(token === null ? req :
        req.clone({setHeaders: {Authorization: `Bearer ${token}`}})).pipe(
        tap(() => {
        }, err => {
          if (err instanceof HttpErrorResponse) /*&& (err.status === 401 || err.status === 403)*/
            this.store.dispatch(new HttpRequestRejected({message: err.message}));
        })
        )
      )
    );
  }
}
