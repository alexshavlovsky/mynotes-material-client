import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {
  AddNotebook,
  ClearNotebooks,
  DeleteNotebook,
  FetchAllNotebooksApiCall,
  FetchAllNotebooksFailure,
  FetchAllNotebooksSuccess,
  LoadNotebooks,
  NotebookActions,
  NotebookActionTypes,
  UpdateNotebook
} from './notebook.actions';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {getTokenDecoded} from '../../../store/principal/principal.selectors';
import {notebooksRelevance} from './notebook.selectors';
import {SnackBarService} from '../../../core/services/snack-bar.service';
import {adaptErrorMessage} from '../../../core/services/app-properties.service';
import {EMPTY, of} from 'rxjs';
import {notebookResponseAdapter} from './notebook.model';
import {newRelevance} from '../store-relevance';
import {ClearNotes} from '../note/note.actions';


@Injectable()
export class NotebookEffects {

  fetchAllNotebooksRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksRequest),
      withLatestFrom(this.store.select(notebooksRelevance)),
      withLatestFrom(this.store.select(getTokenDecoded),
        ([action, relevance], tokenDecoded) => ({relevance, newRelevance: newRelevance(tokenDecoded.userId)})),
      filter(p => p.relevance === null || p.relevance.userId !== p.newRelevance.userId),
      tap(() => this.store.dispatch(new ClearNotebooks())),
      tap(() => this.store.dispatch(new ClearNotes())),
      tap(() => this.store.dispatch(new FetchAllNotebooksApiCall())),
      exhaustMap(p => this.http.getAllNotebooks().pipe(
        map(response => new FetchAllNotebooksSuccess({response, relevance: p.newRelevance})),
        catchError(error =>
          of(new FetchAllNotebooksFailure({message: adaptErrorMessage(error, 'Failed to get all notebooks')}))
        )
      )),
    )
  );

  fetchAllNotebooksSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksSuccess),
      map(action => {
        const notebooks = action.payload.response.map(response => notebookResponseAdapter(response));
        return new LoadNotebooks({notebooks});
      }),
    )
  );

  fetchAllNotebooksFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.FetchAllNotebooksFailure),
      tap(action => this.snackBar.openError(action.payload.message))
    ), {dispatch: false}
  );

  createNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.CreateNotebookRequest),
      exhaustMap(action => this.http.createNotebook(action.payload.notebook).pipe(
        map(response => new AddNotebook({notebook: notebookResponseAdapter(response)})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to create notebook'));
          return EMPTY;
        }))
      )
    )
  );

  updateNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotebookActionTypes.UpdateNotebookRequest),
      exhaustMap(action => this.http.updateNotebook(action.payload.id, action.payload.notebook).pipe(
        map(notebook => new UpdateNotebook({notebook: {id: notebook.id, changes: notebook}})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to update notebook'));
          return EMPTY;
        }))
      )
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

  constructor(private actions$: Actions<NotebookActions>,
              private http: HttpService,
              private store: Store<AppState>,
              private snackBar: SnackBarService) {
  }

}
