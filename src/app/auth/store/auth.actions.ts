import {Action} from '@ngrx/store';
import {UserLoginRequest} from "../model/user-login-request.model";
import {UserLoginResponse} from "../model/user-login-response.model";

export enum AuthActionTypes {
  LoginRequest = '[Auth LoginPage] Login Request',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
}

export class LoginRequest implements Action {
  readonly type = AuthActionTypes.LoginRequest;

  constructor(public payload: { userLoginRequest: UserLoginRequest }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { userLoginResponse: UserLoginResponse }) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: { userLoginErrorMessage: string }) {
  }
}

export type AuthActions = LoginRequest | LoginSuccess | LoginFailure;
