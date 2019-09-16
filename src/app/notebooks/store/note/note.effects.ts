import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, exhaustMap, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {
  FetchAllNotesApiCall,
  FetchAllNotesFailure,
  FetchAllNotesSuccess,
  FetchNotesByNotebookIdApiCall,
  FetchNotesByNotebookIdFailure,
  FetchNotesByNotebookIdSuccess,
  LoadNotes,
  NoteActions,
  NoteActionTypes,
  UpsertNotes
} from './note.actions';
import {noteResponseAdapter} from './note.model';
import {getTokenDecoded} from '../../../store/principal/principal.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {notesRelevance, notesRelevanceAll} from './note.reducer';
import {newRelevance} from '../store-relevance';
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

  fetchAllNotesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchAllNotesRequest),
      withLatestFrom(this.store.select(notesRelevanceAll)),
      withLatestFrom(this.store.select(getTokenDecoded),
        ([action, relevance], tokenDecoded) => ({
          relevance,
          newRelevance: newRelevance(tokenDecoded.userId)
        })),
      filter(p => p.relevance === null || p.relevance.userId !== p.newRelevance.userId),
      tap(() => this.store.dispatch(new FetchAllNotesApiCall())),
      exhaustMap(p => this.http.getAllNotes().pipe(
        map(response => {
          const relevance = {};
          // create a distinct array of notebook ids
          const nbIds = [...new Set(response.map(note => note.notebookId))];
          // create a relevance dictionary
          nbIds.forEach(id => relevance[id] = p.newRelevance);
          return new FetchAllNotesSuccess({response, relevance, relevanceAll: p.newRelevance});
        }),
        catchError(error =>
          of(new FetchAllNotesFailure({message: adaptErrorMessage(error, 'Unknown error')}))
        )
      ))
    ),
  );

  fetchAllNotesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchAllNotesSuccess),
      map(action => {
        const notes = action.payload.response.map(note => noteResponseAdapter(note));
        return new LoadNotes({notes});
      })
    )
  );

  fetchAllNotesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchAllNotesFailure),
      tap(action => this.snackBar.openError(action.payload.message))
    ), {dispatch: false}
  );

  constructor(private actions$: Actions<NoteActions>,
              private store: Store<AppState>,
              private http: HttpService,
              private snackBar: SnackBarService) {
  }

}
