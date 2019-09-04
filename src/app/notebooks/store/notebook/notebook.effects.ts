import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {FetchAllNotebooksSuccess, LoadNotebooks, NotebookActions, NotebookActionTypes} from './notebook.actions';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {getTokenDecoded} from '../../../store/principal/principal.selectors';
import {notebooksRelevance} from './notebook.reducer';


@Injectable()
export class NotebookEffects {

  fetchAllNotebooksRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksRequest),
      withLatestFrom(this.store.select(notebooksRelevance)),
      withLatestFrom(this.store.select(getTokenDecoded),
        ([_, relevance], tokenDecoded) => ({relevance, tokenDecoded})),
      filter(p => p.relevance === null || p.tokenDecoded === null || p.relevance.fetchedWithUserId !== p.tokenDecoded.userId),
      switchMap(p => this.http.getAllNotebooks().pipe(
        map(notebooks => new FetchAllNotebooksSuccess(({notebooks, withUserId: p.tokenDecoded.userId})))
      )),
    )
  );

  fetchAllNotebooksSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksSuccess),
      map(action => new LoadNotebooks({notebooks: action.payload.notebooks})),
    )
  );

  constructor(private actions$: Actions<NotebookActions>,
              private http: HttpService,
              private store: Store<AppState>) {
  }

}
