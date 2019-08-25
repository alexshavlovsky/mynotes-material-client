import {createSelector} from '@ngrx/store';
import {selectAuthState} from './auth.reducer';

export const isAuthenticated = createSelector(
  selectAuthState,
  auth => auth.isAuthenticated
);
