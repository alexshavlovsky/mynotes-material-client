import {Action} from '@ngrx/store';
import {UserLoginRequest} from '../model/user-login-request.model';
import {UserLoginResponse} from '../model/user-login-response.model';
import {UserRegisterRequest} from '../model/user-register-request.model';
import {UserRegisterResponse} from '../model/user-register-response.model';

export enum AuthActionTypes {
  LOGIN_REQUEST = '[Auth LoginPage] Login Request',
  LOGIN_SUCCESS = '[Auth API] Login Success',
  LOGIN_FAILURE = '[Auth API] Login Failure',
  REGISTER_REQUEST = '[Auth RegisterPage] Register Request',
  REGISTER_SUCCESS = '[Auth API] Register Success',
  REGISTER_FAILURE = '[Auth API] Register Failure',
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

export class RegisterRequest implements Action {
  readonly type = AuthActionTypes.REGISTER_REQUEST;

  constructor(public payload: { request: UserRegisterRequest }) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;

  constructor(public payload: { response: UserRegisterResponse }) {
  }
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILURE;

  constructor(public payload: { message: string }) {
  }
}

export type AuthActions =
  LoginRequest | LoginSuccess | LoginFailure |
  RegisterRequest | RegisterSuccess | RegisterFailure;
