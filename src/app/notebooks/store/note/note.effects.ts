import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {catchError, concatMap, exhaustMap, filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {
  AddNote,
  DeleteNote,
  DeleteNotes,
  FetchAllNotesApiCall,
  FetchAllNotesFailure,
  FetchAllNotesSuccess,
  FetchNotesByNotebookIdApiCall,
  FetchNotesByNotebookIdFailure,
  FetchNotesByNotebookIdSuccess,
  LoadNotes,
  NoteActions,
  NoteActionTypes,
  UpdateNote,
  UpsertNotes
} from './note.actions';
import {noteResponseAdapter} from './note.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {SnackBarService} from '../../../core/services/snack-bar.service';
import {EMPTY, of} from 'rxjs';
import {adaptErrorMessage} from '../../../core/services/app-properties.service';
import {ParentNotebookAtomicUpdate} from '../notebook/notebook.actions';
import {notebooksConsistency, storeConsistency} from '../notebook/notebook.selectors';

@Injectable()
export class NoteEffects {

  fetchNotesByNotebookRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdRequest),
      withLatestFrom(this.store.select(notebooksConsistency),
        (action, consistency) => ({
          notebookId: action.payload.notebookId,
          notConsistent: consistency[action.payload.notebookId] !== true
        })),
      filter(p => p.notConsistent),
      tap(p => this.store.dispatch(new FetchNotesByNotebookIdApiCall({notebookId: p.notebookId}))),
      mergeMap(p => this.http.getNotesByNotebookId(p.notebookId).pipe(
        map(response => new FetchNotesByNotebookIdSuccess({response, notebookId: p.notebookId})),
        catchError(error =>
          of(new FetchNotesByNotebookIdFailure({
            message: adaptErrorMessage(error, 'Failed to get notes by notebook'),
            notebookId: p.notebookId
          }))
        )
      ))
    ),
  );

  fetchNotesByNotebookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdSuccess),
      concatMap(action => [
        new DeleteNotes({predicate: note => note.notebookId.toString() === action.payload.notebookId}),
        new UpsertNotes({notes: action.payload.response.map(note => noteResponseAdapter(note))})
      ]),
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
      withLatestFrom(this.store.select(storeConsistency),
        (action, consistency) => consistency),
      filter(consistency => !consistency),
      tap(() => this.store.dispatch(new FetchAllNotesApiCall())),
      exhaustMap(() => this.http.getAllNotes().pipe(
        map(response => new FetchAllNotesSuccess({response})),
        catchError(error =>
          of(new FetchAllNotesFailure({message: adaptErrorMessage(error, 'Failed to get all notes')}))
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

  createNoteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.CreateNoteRequest),
      exhaustMap(action => this.http.createNote(action.payload.note).pipe(
        tap(response => this.store.dispatch(new ParentNotebookAtomicUpdate({
          notebookId: response.notebookId.toString(),
          sizeDelta: 1
        }))),
        map(response => new AddNote({note: noteResponseAdapter(response)})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to create note'));
          return EMPTY;
        }))
      )
    )
  );

  updateNoteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.UpdateNoteRequest),
      exhaustMap(action => this.http.updateNote(action.payload.id, action.payload.note).pipe(
        map(response => noteResponseAdapter(response)),
        tap(note => {
          if (note.notebookId !== action.payload.currentNbId) {
            this.store.dispatch(new ParentNotebookAtomicUpdate({
              notebookId: action.payload.currentNbId.toString(), sizeDelta: -1
            }));
            this.store.dispatch(new ParentNotebookAtomicUpdate({
              notebookId: note.notebookId.toString(), sizeDelta: 1
            }));
          }
        }),
        map(note => new UpdateNote({note: {id: note.id, changes: note}})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to update note'));
          return EMPTY;
        }))
      )
    )
  );

  deleteNoteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.DeleteNoteRequest),
      exhaustMap(action => this.http.deleteNote(action.payload.id).pipe(
        tap(() => this.store.dispatch(new ParentNotebookAtomicUpdate({
          notebookId: action.payload.notebookId,
          sizeDelta: -1
        }))),
        map(() => new DeleteNote({id: action.payload.id.toString()})),
        catchError(error => {
          this.snackBar.openError(adaptErrorMessage(error, 'Failed to delete note'));
          return EMPTY;
        }))
      )
    )
  );

  constructor(private actions$: Actions<NoteActions>,
              private store: Store<AppState>,
              private http: HttpService,
              private snackBar: SnackBarService) {
  }

}
