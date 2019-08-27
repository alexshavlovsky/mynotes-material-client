import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AuthActions, AuthActionTypes, LoginFailure, LoginSuccess} from './auth.actions';
import {HttpService} from "../../services/http.service";
import {of} from "rxjs";
import {adaptErrorMessage, AppPropertiesService} from "../../services/app-properties.service";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class AuthEffects {

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_REQUEST),
      exhaustMap(action => this.http.postLoginRequest(action.payload.request).pipe(
        map(response => new LoginSuccess({response})),
        catchError(error => {
          const message = adaptErrorMessage(error, this.appProps.msgLoginFailure);
          this.snackbar.open(message, this.appProps.snackbarErrorAction,
            {duration: this.appProps.snackbarErrorDelay});
          return of(new LoginFailure({message}))
        }))
      )
    ),
  );

  constructor(private actions$: Actions<AuthActions>,
              private http: HttpService,
              private appProps: AppPropertiesService,
              private snackbar: MatSnackBar) {
  }

}
