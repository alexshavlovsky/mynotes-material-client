import {createSelector} from '@ngrx/store';
import {adapter, selectNotesState} from './note.reducer';
import {Note} from './note.model';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const notesSpinner = createSelector(
  selectNotesState,
  (notes, props: { notebookId: string }) => {
    const spinner = notes.spinner[props.notebookId];
    return spinner === undefined ? false : spinner;
  }
);

export const getAllNotes = createSelector(
  selectNotesState,
  selectAll
);

export const getNotesByNotebookId = createSelector(
  getAllNotes,
  (notes, props: { notebookId: string }) =>
    notes.filter(note => note.notebookId.toString() === props.notebookId)
);

export const getNoteByNotebookIdAndNoteId = createSelector(
  getAllNotes,
  (notes, props: { notebookId: string, noteId: string }): Note => {
    const res: Note[] = notes.filter(note => note.notebookId.toString() === props.notebookId && note.id.toString() === props.noteId);
    return res.length === 1 ? res[0] : null;
  }
);
