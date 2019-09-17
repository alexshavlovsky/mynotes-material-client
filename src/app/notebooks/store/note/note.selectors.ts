import {createSelector} from '@ngrx/store';
import {adapter, selectNotesState} from './note.reducer';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const notesRelevance = createSelector(
  selectNotesState,
  notes => notes.relevance
);

export const notesRelevanceAll = createSelector(
  selectNotesState,
  notes => notes.relevanceAll
);

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
