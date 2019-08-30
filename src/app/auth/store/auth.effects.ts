import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {
  AuthActions,
  AuthActionTypes,
  LoginFailure,
  LoginSuccess,
  RegisterFailure,
  RegisterSuccess
} from './auth.actions';
import {HttpService} from '../../core/services/http.service';
import {of} from 'rxjs';
import {adaptErrorMessage, AppPropertiesService} from '../../core/services/app-properties.service';
import {SnackBarService} from '../../core/services/snack-bar.service';
import {Login} from '../../store/principal/principal.actions';

@Injectable()
export class AuthEffects {

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_REQUEST),
      exhaustMap(action => this.http.postLoginRequest(action.payload.request).pipe(
        map(response => new LoginSuccess({response})),
        catchError(error =>
          of(new LoginFailure({message: adaptErrorMessage(error, this.appProps.msgLoginFailure)}))
        ))
      )
    ),
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      map(action => new Login({principal: action.payload.response}))
    )
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE),
      tap(action => this.snackBar.openError(action.payload.message))
    ), {dispatch: false}
  );

  registerRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_REQUEST),
      exhaustMap(action => this.http.postRegisterRequest(action.payload.request).pipe(
        map(response => new RegisterSuccess({response})),
        catchError(error =>
          of(new RegisterFailure({message: adaptErrorMessage(error, this.appProps.msgRegisterFailure)}))
        ))
      )
    ),
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_SUCCESS),
      tap(() => this.snackBar.openSuccess(this.appProps.msgRegisterSuccess))
    ), {dispatch: false}
  );

  registerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_FAILURE),
      tap(action => this.snackBar.openError(action.payload.message))
    ), {dispatch: false}
  );

  constructor(private actions$: Actions<AuthActions>,
              private http: HttpService,
              private appProps: AppPropertiesService,
              private snackBar: SnackBarService) {
  }

}
