import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from "../store";
import {Store} from "@ngrx/store";
import {isTokenAbsent} from "../store/principal/principal.selectors";
import {AbstractAuthGuard} from "./abstract.auth.guard";

@Injectable({
  providedIn: 'root'
})
export class AuthInverseGuard extends AbstractAuthGuard {
  constructor(protected store: Store<AppState>,
              protected router: Router) {
    super(store, router, isTokenAbsent);
  }

}
