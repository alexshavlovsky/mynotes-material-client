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

export const isTokenPresent = createSelector(
  getToken,
  token => token !== null
);

export const isTokenAbsent = createSelector(
  getToken,
  token => token === null
);

export const userDetails = createSelector(
  selectPrincipalState,
  principal => principal.user
);
