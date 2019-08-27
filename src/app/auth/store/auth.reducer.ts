import {AuthActions, AuthActionTypes} from './auth.actions';
import {createFeatureSelector} from "@ngrx/store";
import {UserRegisterResponse} from "../model/user-register-response.model";

export const authStateKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export interface AuthState {
  isLoginRequestInProgress: boolean
  loginLastErrorMessage: string
  isRegisterRequestInProgress: boolean
  registerLastErrorMessage: string
  token: string
  user: UserRegisterResponse
}

export const initialAuthState: AuthState = {
  isLoginRequestInProgress: false,
  loginLastErrorMessage: null,
  isRegisterRequestInProgress: false,
  registerLastErrorMessage: null,
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
      return {
        ...state,
        isLoginRequestInProgress: false,
        loginLastErrorMessage: action.payload.message,
      };

    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isRegisterRequestInProgress: true,
        registerLastErrorMessage: null,
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterRequestInProgress: false,
      };

    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isRegisterRequestInProgress: false,
        registerLastErrorMessage: action.payload.message,
      };

    default:
      return state;
  }
}
