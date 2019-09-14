import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, concatMap, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {
  FetchNotesByNotebookIdApiCall,
  FetchNotesByNotebookIdFailure,
  FetchNotesByNotebookIdRequest,
  FetchNotesByNotebookIdSuccess,
  NoteActions,
  NoteActionTypes,
  UpsertNotes
} from './note.actions';
import {noteResponseAdapter} from './note.model';
import {getTokenDecoded} from '../../../store/principal/principal.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {notesRelevance} from './note.reducer';
import {newRelevance} from '../store-relevance';
import {getAllNotebooks} from '../notebook/notebook.reducer';
import {SnackBarService} from '../../../core/services/snack-bar.service';
import {of} from 'rxjs';
import {adaptErrorMessage} from '../../../core/services/app-properties.service';

@Injectable()
export class NoteEffects {

  fetchNotesByNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdRequest),
      withLatestFrom(this.store.select(notesRelevance)),
      withLatestFrom(this.store.select(getTokenDecoded),
        ([action, relevance], tokenDecoded) => ({
          notebookId: action.payload.notebookId,
          relevance,
          newRelevance: newRelevance(tokenDecoded.userId)
        })),
      filter(p => p.relevance[p.notebookId] === undefined || p.relevance[p.notebookId].userId !== p.newRelevance.userId),
      tap(p => this.store.dispatch(new FetchNotesByNotebookIdApiCall({notebookId: p.notebookId}))),
      mergeMap(p => this.http.getNotesByNotebookId(p.notebookId).pipe(
        map(response => new FetchNotesByNotebookIdSuccess({
          response, notebookId: p.notebookId, relevance: p.newRelevance
        })),
        catchError(error =>
          of(new FetchNotesByNotebookIdFailure({message: adaptErrorMessage(error, 'Unknown error'), notebookId: p.notebookId}))
        )
      ))
    ),
  );

  fetchNotesByNotebookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdSuccess),
      map(action => {
        // TODO: remove notes before upsert?
        const notes = action.payload.response.map(note => noteResponseAdapter(note));
        return new UpsertNotes({notes});
      })
    )
  );

  fetchNotesByNotebookFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdFailure),
      tap(action => this.snackBar.openError(action.payload.message))
    ), {dispatch: false}
  );

  fetchAllNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchAllNotes),
      withLatestFrom(this.store.select(getAllNotebooks)),
      map(([action, notebooks]) => notebooks.map(notebook => new FetchNotesByNotebookIdRequest({notebookId: notebook.id.toString()}))),
      concatMap(actions => actions)
    ),
  );

  constructor(private actions$: Actions<NoteActions>,
              private store: Store<AppState>,
              private http: HttpService,
              private snackBar: SnackBarService) {
  }

}
