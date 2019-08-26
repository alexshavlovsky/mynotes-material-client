import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AuthActions, AuthActionTypes, LoginFailure, LoginSuccess} from './auth.actions';
import {HttpService} from "../../services/http.service";
import {of} from "rxjs";
import {adaptErrorMessage, AppPropertiesService} from "../../services/app-properties.service";


@Injectable()
export class AuthEffects {

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LoginRequest),
      exhaustMap(action => this.http.postLoginRequest(action.payload.userLoginRequest).pipe(
        map(userLoginResponse => new LoginSuccess({userLoginResponse})),
        catchError(error =>
          of(new LoginFailure({userLoginErrorMessage: adaptErrorMessage(error, this.appProps.msgLoginFailure)}))
        ))
      )
    ),
  );

  constructor(private actions$: Actions<AuthActions>,
              private http: HttpService,
              private appProps: AppPropertiesService) {
  }

}
