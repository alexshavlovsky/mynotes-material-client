import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {exhaustMap, filter, map, withLatestFrom} from 'rxjs/operators';
import {HttpService} from '../../../core/services/http.service';
import {FetchNotesByNotebookIdSuccess, NoteActions, NoteActionTypes, UpsertNotes} from './note.actions';
import {noteResponseAdapter} from './note.model';
import {getTokenDecoded} from '../../../store/principal/principal.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {notesRelevance} from './note.reducer';
import {newRelevance} from '../store-relevance';

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
      exhaustMap(p => this.http.getNotesByNotebookId(p.notebookId).pipe(
        map(response => new FetchNotesByNotebookIdSuccess({
          response, notebookId: p.notebookId, relevance: p.newRelevance
        }))
      )),
    )
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

  constructor(private actions$: Actions<NoteActions>,
              private store: Store<AppState>,
              private http: HttpService) {
  }

}
