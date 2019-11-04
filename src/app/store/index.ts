import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {PrincipalActionTypes} from './principal/principal.actions';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function onLogoutStateReset(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(action.type === PrincipalActionTypes.LOGOUT ? undefined : state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [
  onLogoutStateReset
];
