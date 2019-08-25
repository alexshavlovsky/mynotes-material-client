import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {map, tap} from 'rxjs/operators';
import {AuthActions, AuthActionTypes, LoginRequested} from './auth.actions';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
      this.actions$.pipe(
        ofType<LoginRequested>(AuthActionTypes.LoginRequested),
        map(action => action.payload.userLoginRequest),
        tap(request => console.log(request)),
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions<AuthActions>) {
  }

}
