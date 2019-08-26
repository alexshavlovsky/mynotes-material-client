import {createSelector} from '@ngrx/store';
import {selectAuthState} from './auth.reducer';

export const authToken = createSelector(
  selectAuthState,
  auth => auth.token
);
