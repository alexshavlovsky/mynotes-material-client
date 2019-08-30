import {AuthActions, AuthActionTypes} from './auth.actions';
import {createFeatureSelector} from '@ngrx/store';

export const authStateKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export interface AuthState {
  isLoginRequestInProgress: boolean;
  loginLastErrorMessage: string;
  isRegisterRequestInProgress: boolean;
  registerLastErrorMessage: string;
}

export const initialAuthState: AuthState = {
  isLoginRequestInProgress: false,
  loginLastErrorMessage: null,
  isRegisterRequestInProgress: false,
  registerLastErrorMessage: null,
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
      return {
        ...state,
        isLoginRequestInProgress: false,
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
