import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {FetchAllNotebooksSuccess, NotebookActions, NotebookActionTypes, UpsertNotebooks} from './notebook.actions';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {getToken} from '../../../store/principal/principal.selectors';
import {notebooksRelevance} from './notebook.reducer';


@Injectable()
export class NotebookEffects {

  fetchAllNotebooksRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksRequest),
      withLatestFrom(this.store.select(notebooksRelevance)),
      withLatestFrom(this.store.select(getToken),
        ([_, relevance], token) => ({relevance, token})),
      filter(p => p.relevance === null || p.relevance.fetchedWithToken !== p.token),
      switchMap(p => this.http.getAllNotebooks().pipe(
        map(notebooks => new FetchAllNotebooksSuccess(({notebooks, withToken: p.token})))
      )),
    )
  );

  fetchAllNotebooksSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksSuccess),
      map(action => action.payload.notebooks),
      map(notebooks => new UpsertNotebooks({notebooks})),
    )
  );

  constructor(private actions$: Actions<NotebookActions>,
              private http: HttpService,
              private store: Store<AppState>) {
  }

}
