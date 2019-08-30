import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SnackBarService} from '../../core/services/snack-bar.service';
import {PrincipalActions, PrincipalActionTypes, SetTokenAndFetchUser} from './principal.actions';
import {filter, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

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

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.LOGIN),
      tap(action => localStorage.setItem('token', action.payload.principal.token)),
      tap(action => this.snackBar.openSuccess('You logged in as ' + action.payload.principal.user.firstName)),
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
              private router: Router) {
  }

}
