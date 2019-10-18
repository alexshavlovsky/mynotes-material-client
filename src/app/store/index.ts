import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {PrincipalActionTypes} from './principal/principal.actions';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  reducer => (state, action) => reducer(action.type === PrincipalActionTypes.LOGOUT ? undefined : state, action)
];
