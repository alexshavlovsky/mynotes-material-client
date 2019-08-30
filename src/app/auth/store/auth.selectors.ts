import {createSelector} from '@ngrx/store';
import {selectAuthState} from './auth.reducer';

export const isLoginInProgress = createSelector(
  selectAuthState,
  auth => auth.isLoginRequestInProgress
);

export const loginLastErrorMessage = createSelector(
  selectAuthState,
  auth => auth.loginLastErrorMessage
);

export const isRegisterInProgress = createSelector(
  selectAuthState,
  auth => auth.isRegisterRequestInProgress
);

export const registerLastErrorMessage = createSelector(
  selectAuthState,
  auth => auth.registerLastErrorMessage
);
