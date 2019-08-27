import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, map} from 'rxjs/operators';
import {
  AuthActions,
  AuthActionTypes,
  LoginFailure,
  LoginSuccess,
  RegisterFailure,
  RegisterSuccess
} from './auth.actions';
import {HttpService} from "../../services/http.service";
import {of} from "rxjs";
import {adaptErrorMessage, AppPropertiesService} from "../../services/app-properties.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Injectable()
export class AuthEffects {

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_REQUEST),
      exhaustMap(action => this.http.postLoginRequest(action.payload.request).pipe(
        map(response => new LoginSuccess({response})),
        catchError(error => {
          const message = adaptErrorMessage(error, this.appProps.msgLoginFailure);
          this.snackBar.openError(message);
          return of(new LoginFailure({message}))
        }))
      )
    ),
  );

  registerRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_REQUEST),
      exhaustMap(action => this.http.postRegisterRequest(action.payload.request).pipe(
        map(response => {
          this.snackBar.openSuccess(this.appProps.msgRegisterSuccess);
          return new RegisterSuccess({response});
        }),
        catchError(error => {
          const message = adaptErrorMessage(error, this.appProps.msgRegisterFailure);
          this.snackBar.openError(message);
          return of(new RegisterFailure({message}))
        }))
      )
    ),
  );

  constructor(private actions$: Actions<AuthActions>,
              private http: HttpService,
              private appProps: AppPropertiesService,
              private snackBar: SnackBarService) {
  }

}
