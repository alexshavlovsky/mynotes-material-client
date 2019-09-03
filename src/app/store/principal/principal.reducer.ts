import {createFeatureSelector} from '@ngrx/store';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {PrincipalActions, PrincipalActionTypes} from './principal.actions';

export const principalFeatureKey = 'principal';

export const selectPrincipalState = createFeatureSelector<PrincipalState>(principalFeatureKey);

export interface PrincipalState {
  token: string;
  user: UserRegisterResponse;
}

export const initialState: PrincipalState = {
  token: null,
  user: null
};

export function reducer(state = initialState, action: PrincipalActions): PrincipalState {
  switch (action.type) {
    case PrincipalActionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.principal.token,
        user: action.payload.principal.user,
      };
    case PrincipalActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    case PrincipalActionTypes.SET_TOKEN_AND_FETCH_USER:
      return {
        ...state,
        token: action.payload.token,
      };
    case PrincipalActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.response,
      };
    default:
      return state;
  }
}
