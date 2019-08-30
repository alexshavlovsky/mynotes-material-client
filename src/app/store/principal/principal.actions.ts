import {Action} from '@ngrx/store';
import {UserLoginResponse} from "../../auth/model/user-login-response.model";
import {UserRegisterResponse} from "../../auth/model/user-register-response.model";

export enum PrincipalActionTypes {
  LOGIN = '[AuthModule] Login',
  LOGOUT = '[UI] Logout',
  APPROVE_TOKEN_ON_APP_INIT = '[AppInit Core] Approve token',
  FETCH_USER_SUCCESS = '[AppInit API] Fetch current user success',
  FETCH_USER_FAILURE = '[AppInit API] Fetch current user failure',
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

export class ApproveTokenOnAppInit implements Action {
  readonly type = PrincipalActionTypes.APPROVE_TOKEN_ON_APP_INIT;

  constructor(public payload: { token: string }) {
  }
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
  ApproveTokenOnAppInit |
  FetchUserSuccess | FetchUserFailure |
  PrincipalApproved | PrincipalRejected |
  TokenRejected;
