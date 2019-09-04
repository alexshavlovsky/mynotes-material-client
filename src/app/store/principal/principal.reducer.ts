import {createFeatureSelector} from '@ngrx/store';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {PrincipalActions, PrincipalActionTypes} from './principal.actions';
import {JwtTokenDetails} from '../../core/services/auth.service';

export const principalFeatureKey = 'principal';

export const selectPrincipalState = createFeatureSelector<PrincipalState>(principalFeatureKey);

export interface PrincipalState {
  token: string;
  tokenDecoded: JwtTokenDetails;
  user: UserRegisterResponse;
}

export const initialState: PrincipalState = {
  token: null,
  tokenDecoded: null,
  user: null
};

export function reducer(state = initialState, action: PrincipalActions): PrincipalState {
  switch (action.type) {
    case PrincipalActionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.principal.token,
        tokenDecoded: action.payload.tokenDecoded,
        user: action.payload.principal.user,
      };
    case PrincipalActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        tokenDecoded: null,
        user: null,
      };
    case PrincipalActionTypes.SET_TOKEN_AND_FETCH_USER:
      return {
        ...state,
        token: action.payload.token,
        tokenDecoded: action.payload.tokenDecoded,
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
