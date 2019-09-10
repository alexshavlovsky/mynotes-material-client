import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {exhaustMap, map} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {FetchNotesByNotebookIdSuccess, NoteActions, NoteActionTypes, UpsertNotes} from './note.actions';

@Injectable()
export class NoteEffects {

  fetchAllNotesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdRequest),
      exhaustMap(action => this.http.getNotesByNotebookId(action.payload.notebookId).pipe(
        map(notes => new FetchNotesByNotebookIdSuccess({notes}))
      )),
    )
  );

  fetchAllNotesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoteActionTypes.FetchNotesByNotebookIdSuccess),
      map(action => new UpsertNotes({notes: action.payload.notes})),
    )
  );

  constructor(private actions$: Actions<NoteActions>,
              private http: HttpService) {
  }

}
