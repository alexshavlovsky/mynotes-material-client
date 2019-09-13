import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {
  AddNotebook,
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
import {notebookResponseAdapter} from './notebook.model';
import {newRelevance} from '../store-relevance';


@Injectable()
export class NotebookEffects {

  fetchAllNotebooksRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksRequest),
      withLatestFrom(this.store.select(notebooksRelevance)),
      withLatestFrom(this.store.select(getTokenDecoded),
        ([action, relevance], tokenDecoded) => ({relevance, newRelevance: newRelevance(tokenDecoded.userId)})),
      filter(p => p.relevance === null || p.relevance.userId !== p.newRelevance.userId),
      switchMap(p => this.http.getAllNotebooks().pipe(
        map(response => new FetchAllNotebooksSuccess({response, relevance: p.newRelevance}))
      )),
    )
  );

  fetchAllNotebooksSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksSuccess),
      // TODO: clear notes store before
      map(action => {
        const notebooks = action.payload.response.map(response => notebookResponseAdapter(response));
        return new LoadNotebooks({notebooks});
      }),
    )
  );

  deleteNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.DeleteNotebookRequest),
      // TODO: implement cascade deletion of notes in the store
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
        // TODO: update relevance
        map(notebook => new UpdateNotebook({notebook: {id: notebook.id, changes: notebook}})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to rename notebook'));
          return EMPTY;
        }))
      )
    )
  );

  createNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.CreateNotebookRequest),
      withLatestFrom(this.store.select(getTokenDecoded),
        (action, tokenDecoded) => ({action, tokenDecoded})),
      exhaustMap(p => this.http.createNotebook(p.action.payload.notebook).pipe(
        map(response => new AddNotebook({notebook: notebookResponseAdapter(response)})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to create notebook'));
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
