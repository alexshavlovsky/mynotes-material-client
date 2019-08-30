import {Action} from '@ngrx/store';
import {UserLoginResponse} from "../../auth/model/user-login-response.model";
import {UserRegisterResponse} from "../../auth/model/user-register-response.model";

export enum PrincipalActionTypes {
  LOGIN = '[AuthModule] Login',
  LOGOUT = '[UI] Logout',
  APP_INIT = '[AppInit Core] Init',
  SET_TOKEN_AND_FETCH_USER = '[AppInit Core] Set token and fetch user',
  FETCH_USER_SUCCESS = '[Auth API] Fetch current user success',
  FETCH_USER_FAILURE = '[Auth API] Fetch current user failure',
  PRINCIPAL_APPROVED = '[AppInit Core] Principal approved',
  PRINCIPAL_REJECTED = '[AppInit Core] Principal rejected',
  TOKEN_REJECTED = '[Auth Core] Token rejected',
}

export class Login implements Action {
  readonly type = PrincipalActionTypes.LOGIN;

  constructor(public payload: { principal: UserLoginResponse }) {
  }
}

export class Logout implements Action {
  readonly type = PrincipalActionTypes.LOGOUT;
}

export class SetTokenAndFetchUser implements Action {
  readonly type = PrincipalActionTypes.SET_TOKEN_AND_FETCH_USER;

  constructor(public payload: { token: string }) {
  }
}

export class AppInit implements Action {
  readonly type = PrincipalActionTypes.APP_INIT;
}

export class FetchUserSuccess implements Action {
  readonly type = PrincipalActionTypes.FETCH_USER_SUCCESS;

  constructor(public payload: { user: UserRegisterResponse }) {
  }
}

export class FetchUserFailure implements Action {
  readonly type = PrincipalActionTypes.FETCH_USER_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export class PrincipalApproved implements Action {
  readonly type = PrincipalActionTypes.PRINCIPAL_APPROVED;

  constructor(public payload: { user: UserRegisterResponse }) {
  }
}

export class PrincipalRejected implements Action {
  readonly type = PrincipalActionTypes.PRINCIPAL_REJECTED;
}

export class TokenRejected implements Action {
  readonly type = PrincipalActionTypes.TOKEN_REJECTED;
}

export type PrincipalActions =
  Login | Logout |
  AppInit | SetTokenAndFetchUser |
  FetchUserSuccess | FetchUserFailure |
  PrincipalApproved | PrincipalRejected |
  TokenRejected;
