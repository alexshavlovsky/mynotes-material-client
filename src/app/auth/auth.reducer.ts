import {AuthActions, AuthActionTypes} from './auth.actions';
import {createFeatureSelector} from "@ngrx/store";
import {UserRegisterResponse} from "./model/user-register-response.model";

export const authStateKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export interface AuthState {
  isLoginRequestInProgress: boolean
  loginErrorMessage: string
  token: string
  user: UserRegisterResponse
}

export const initialAuthState: AuthState = {
  isLoginRequestInProgress: false,
  loginErrorMessage: null,
  token: null,
  user: null
};

export function reducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginRequest:
      return {
        ...state,
        isLoginRequestInProgress: true,
        loginErrorMessage: null,
      };

    case AuthActionTypes.LoginSuccess:
      const response = action.payload.userLoginResponse;
      return {
        ...state,
        isLoginRequestInProgress: false,
        token: response.token,
        user: response.user,
      };

    case AuthActionTypes.LoginFailure:
      const message = action.payload.userLoginErrorMessage;
      return {
        ...state,
        isLoginRequestInProgress: false,
        loginErrorMessage: message,
      };

    default:
      return state;
  }
}
