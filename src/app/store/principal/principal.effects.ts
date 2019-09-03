import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SnackBarService} from '../../core/services/snack-bar.service';
import {
  FetchUserFailure,
  FetchUserSuccess,
  Logout,
  PrincipalActions,
  PrincipalActionTypes,
  SetTokenAndFetchUser
} from './principal.actions';
import {catchError, filter, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {HttpService} from '../../core/services/http.service';

@Injectable()
export class PrincipalEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.APP_INIT),
      map(() => localStorage.getItem('token')),
      filter(token => token !== null),
      map(token => new SetTokenAndFetchUser({token}))
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.SET_TOKEN_AND_FETCH_USER),
      switchMap(() => this.http.getCurrentUserRequest().pipe(
        map(response => new FetchUserSuccess({response})),
        catchError(() => of(new FetchUserFailure())))
      )
    )
  );

  fetchUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.FETCH_USER_FAILURE),
      map(() => new Logout())
    )
  );

  httpRequestRejected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.HTTP_REQUEST_REJECTED),
      tap(action => console.log(action.payload.message))
    ), {dispatch: false}
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.LOGIN),
      tap(action => localStorage.setItem('token', action.payload.principal.token)),
//      tap(action => this.snackBar.openSuccess('You logged in as ' + action.payload.principal.user.firstName)),
      tap(() => this.router.navigate(['/'])),
    ), {dispatch: false}
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.LOGOUT),
      tap(() => localStorage.removeItem('token')),
      tap(() => this.router.navigate(['/'])),
    ), {dispatch: false}
  );

  constructor(private actions$: Actions<PrincipalActions>,
              private snackBar: SnackBarService,
              private router: Router,
              private http: HttpService) {
  }

}
