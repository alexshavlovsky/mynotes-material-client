import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Note} from './note.model';
import {NoteActions, NoteActionTypes} from './note.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const notesFeatureKey = 'notes';

export const selectNotesState = createFeatureSelector<NotesState>(notesFeatureKey);

export interface NotesState extends EntityState<Note> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>();

export const initialState: NotesState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: NoteActions): NotesState {
  switch (action.type) {
    case NoteActionTypes.AddNote: {
      return adapter.addOne(action.payload.note, state);
    }

    case NoteActionTypes.UpsertNote: {
      return adapter.upsertOne(action.payload.note, state);
    }

    case NoteActionTypes.AddNotes: {
      return adapter.addMany(action.payload.notes, state);
    }

    case NoteActionTypes.UpsertNotes: {
      return adapter.upsertMany(action.payload.notes, state);
    }

    case NoteActionTypes.UpdateNote: {
      return adapter.updateOne(action.payload.note, state);
    }

    case NoteActionTypes.UpdateNotes: {
      return adapter.updateMany(action.payload.notes, state);
    }

    case NoteActionTypes.DeleteNote: {
      return adapter.removeOne(action.payload.id, state);
    }

    case NoteActionTypes.DeleteNotes: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case NoteActionTypes.LoadNotes: {
      return adapter.addAll(action.payload.notes, state);
    }

    case NoteActionTypes.ClearNotes: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getAllNotes = createSelector(
  selectNotesState,
  selectAll
);

export const getNotesByNotebookId = createSelector(
  getAllNotes,
  (notes, props: { notebookId: string }) => {
    return notes.filter((note: Note) => note.notebookId.toString() === props.notebookId);
  }
);
