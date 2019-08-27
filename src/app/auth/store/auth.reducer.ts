import {AuthActions, AuthActionTypes} from './auth.actions';
import {createFeatureSelector} from "@ngrx/store";
import {UserRegisterResponse} from "../model/user-register-response.model";

export const authStateKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export interface AuthState {
  isLoginRequestInProgress: boolean
  loginLastErrorMessage: string
  token: string
  user: UserRegisterResponse
}

export const initialAuthState: AuthState = {
  isLoginRequestInProgress: false,
  loginLastErrorMessage: null,
  token: null,
  user: null
};

export function reducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoginRequestInProgress: true,
        loginLastErrorMessage: null,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      const response = action.payload.response;
      return {
        ...state,
        isLoginRequestInProgress: false,
        token: response.token,
        user: response.user,
      };

    case AuthActionTypes.LOGIN_FAILURE:
      const message = action.payload.message;
      return {
        ...state,
        isLoginRequestInProgress: false,
        loginLastErrorMessage: message,
      };

    default:
      return state;
  }
}
