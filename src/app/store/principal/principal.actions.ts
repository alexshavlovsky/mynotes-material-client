import {Action} from '@ngrx/store';
import {UserLoginResponse} from '../../auth/model/user-login-response.model';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {JwtTokenDetails} from '../../core/services/auth.service';

export enum PrincipalActionTypes {
  LOGIN = '[AuthModule] Login',
  LOGOUT = '[UI/Core] Logout',
  APP_INIT = '[AppInit Core] Init',
  SET_TOKEN_AND_FETCH_USER = '[AppInit Core] Set token and fetch user',
  FETCH_USER_SUCCESS = '[Auth API] Fetch current user success',
  FETCH_USER_FAILURE = '[Auth API] Fetch current user failure',
  HTTP_REQUEST_REJECTED = '[HTTP client] HTTP request rejected',
}

export class Login implements Action {
  readonly type = PrincipalActionTypes.LOGIN;

  constructor(public payload: { principal: UserLoginResponse, tokenDecoded: JwtTokenDetails }) {
  }
}

export class Logout implements Action {
  readonly type = PrincipalActionTypes.LOGOUT;
}

export class SetTokenAndFetchUser implements Action {
  readonly type = PrincipalActionTypes.SET_TOKEN_AND_FETCH_USER;

  constructor(public payload: { token: string, tokenDecoded: JwtTokenDetails }) {
  }
}

export class AppInit implements Action {
  readonly type = PrincipalActionTypes.APP_INIT;
}

export class FetchUserSuccess implements Action {
  readonly type = PrincipalActionTypes.FETCH_USER_SUCCESS;

  constructor(public payload: { response: UserRegisterResponse }) {
  }
}

export class FetchUserFailure implements Action {
  readonly type = PrincipalActionTypes.FETCH_USER_FAILURE;
}

export class HttpRequestRejected implements Action {
  readonly type = PrincipalActionTypes.HTTP_REQUEST_REJECTED;

  constructor(public payload: { message: string }) {
  }
}

export type PrincipalActions =
  Login | Logout |
  AppInit | SetTokenAndFetchUser |
  FetchUserSuccess | FetchUserFailure |
  HttpRequestRejected;
