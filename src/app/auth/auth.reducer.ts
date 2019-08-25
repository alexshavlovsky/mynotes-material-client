import {AuthActions, AuthActionTypes} from './auth.actions';
import {createFeatureSelector} from "@ngrx/store";
import {UserRegisterResponse} from "./model/user-register-response.model";

export const authStateKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authStateKey);

export interface AuthState {
  isLoginRequestInProgress: boolean
  isAuthenticated: boolean
  loginErrorMessage: string | null
  token: string | null
  user: UserRegisterResponse | null
}

export const initialAuthState: AuthState = {
  isLoginRequestInProgress: false,
  isAuthenticated: false,
  loginErrorMessage: null,
  token: null,
  user: null
};

export function reducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginRequested:
      return state;

    default:
      return state;
  }
}
