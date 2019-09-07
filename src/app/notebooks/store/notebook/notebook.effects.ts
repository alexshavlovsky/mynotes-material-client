import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {
  DeleteNotebook,
  FetchAllNotebooksSuccess,
  LoadNotebooks,
  NotebookActions,
  NotebookActionTypes,
  UpdateNotebook
} from './notebook.actions';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {getTokenDecoded} from '../../../store/principal/principal.selectors';
import {notebooksRelevance} from './notebook.reducer';
import {SnackBarService} from '../../../core/services/snack-bar.service';
import {adaptErrorMessage} from '../../../core/services/app-properties.service';
import {EMPTY} from 'rxjs';


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

  deleteNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.DeleteNotebookRequest),
      exhaustMap(action => this.http.deleteNotebook(action.payload.id).pipe(
        map(() => new DeleteNotebook({id: action.payload.id.toString()})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to delete notebook'));
          return EMPTY;
        }))
      )
    )
  );

  renameNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.RenameNotebookRequest),
      exhaustMap(action => this.http.renameNotebook(action.payload.id, {name: action.payload.name}).pipe(
        map(notebook => new UpdateNotebook({notebook: {id: notebook.id, changes: notebook}})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to rename notebook'));
          return EMPTY;
        }))
      )
    )
  );

  constructor(private actions$: Actions<NotebookActions>,
              private http: HttpService,
              private store: Store<AppState>,
              private snackBar: SnackBarService) {
  }

}
