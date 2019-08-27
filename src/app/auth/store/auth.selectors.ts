import {createSelector} from '@ngrx/store';
import {selectAuthState} from './auth.reducer';

export const authToken = createSelector(
  selectAuthState,
  auth => auth.token
);

export const isLoginInProgress = createSelector(
  selectAuthState,
  auth => auth.isLoginRequestInProgress
);

export const loginLastErrorMessage = createSelector(
  selectAuthState,
  auth => auth.loginLastErrorMessage
);
