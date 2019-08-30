import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SnackBarService} from "../../services/snack-bar.service";
import {PrincipalActions, PrincipalActionTypes} from "./principal.actions";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class PrincipalEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.LOGIN),
      tap(action => this.snackBar.openSuccess('You logged in as ' + action.payload.principal.user.firstName)),
      tap(() => this.router.navigate(['/'])),
    ), {dispatch: false}
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrincipalActionTypes.LOGOUT),
      tap(() => this.router.navigate(['/'])),
    ), {dispatch: false}
  );

  constructor(private actions$: Actions<PrincipalActions>,
              private snackBar: SnackBarService,
              private router: Router) {
  }

}
