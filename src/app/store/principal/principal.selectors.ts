import {createSelector} from '@ngrx/store';
import {selectPrincipalState} from './principal.reducer';

export const getToken = createSelector(
  selectPrincipalState,
  principal => principal.token
);

export const getTokenDecoded = createSelector(
  selectPrincipalState,
  principal => principal.tokenDecoded
);

export const userDetails = createSelector(
  selectPrincipalState,
  principal => principal.user
);

export const tokenDecoded = createSelector(
  selectPrincipalState,
  principal => principal.tokenDecoded
);

export const isAdmin = createSelector(
  tokenDecoded,
  token => token !== null && token.hasRoleAdmin
);

export const isUser = createSelector(
  tokenDecoded,
  token => token !== null && token.hasRoleUser
);
