import {Action} from '@ngrx/store';
import {UserLoginRequest} from "./model/user-login-request.model";
import {UserLoginResponse} from "./model/user-login-response.model";

export enum AuthActionTypes {
  LoginRequested = '[Auth LoginPage] Login Requested',
  LoginSuccess = '[Auth API] Login Success',
  LoginError = '[Auth API] Login Error',
}

export class LoginRequested implements Action {
  readonly type = AuthActionTypes.LoginRequested;

  constructor(public payload: { userLoginRequest: UserLoginRequest }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { userLoginResponse: UserLoginResponse }) {
  }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;

  constructor(public payload: { userLoginErrorMessage: string }) {
  }
}

export type AuthActions = LoginRequested | LoginSuccess | LoginError;
