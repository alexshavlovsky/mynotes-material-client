import {Action} from '@ngrx/store';
import {UserLoginRequest} from "../model/user-login-request.model";
import {UserLoginResponse} from "../model/user-login-response.model";

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth LoginPage] Login Request',
  LOGIN_SUCCESS = '[Auth API] Login Success',
  LOGIN_FAILURE = '[Auth API] Login Failure',
}

export class LoginRequest implements Action {
  readonly type = AuthActionTypes.LOGIN_REQUEST;

  constructor(public payload: { request: UserLoginRequest }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { response: UserLoginResponse }) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type AuthActions = LoginRequest | LoginSuccess | LoginFailure;
