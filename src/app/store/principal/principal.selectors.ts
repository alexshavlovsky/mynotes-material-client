import {createSelector} from '@ngrx/store';
import {selectPrincipalState} from './principal.reducer';

export const isTokenPresent = createSelector(
  selectPrincipalState,
  principal => principal.token !== null
);

export const isTokenAbsent = createSelector(
  selectPrincipalState,
  principal => principal.token == null
);

export const userDetails = createSelector(
  selectPrincipalState,
  principal => principal.user
);
