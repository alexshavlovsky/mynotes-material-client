import {createSelector} from '@ngrx/store';
import {adapter, selectNotebooksState} from './notebook.reducer';
import {getAllNotes} from '../note/note.selectors';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const notebooksRelevance = createSelector(
  selectNotebooksState,
  notebooks => notebooks.relevance
);

export const notebooksSpinner = createSelector(
  selectNotebooksState,
  notebooks => notebooks.spinner
);

export const getNotebookSearchMode = createSelector(
  selectNotebooksState,
  notebooks => notebooks.searchMode
);

export const getNotebookSearchQuery = createSelector(
  selectNotebooksState,
  notebooks => notebooks.searchQuery
);

export const getAllNotebooks = createSelector(
  selectNotebooksState,
  selectAll
);

export const getAllNotebookEntities = createSelector(
  selectNotebooksState,
  selectEntities
);

export const getAllNotebookIds = createSelector(
  selectNotebooksState,
  selectIds
);

export const getNotebookById = createSelector(
  getAllNotebookEntities,
  (notebooks, props) => notebooks[props.notebookId]
);

export const fetchedNotebooksSize = createSelector(
  getAllNotes,
  (notes): { [id: string]: number } => {
    const res = {};
    notes.forEach(note => {
      const nbId = note.notebookId;
      const cur = res[nbId];
      res[nbId] = cur === undefined ? 1 : cur + 1;
    });
    return res;
  }
);

export const notebooksConsistency = createSelector(
  fetchedNotebooksSize,
  getAllNotebooks,
  (sizes, notebooks): { [id: string]: boolean } => {
    const res = {};
    notebooks.forEach(notebook => {
      const id = notebook.id;
      const size = notebook.size;
      res[id] = (size === 0 && sizes[id] === undefined) || size === sizes[id];
    });
    return res;
  }
);

export const storeConsistency = createSelector(
  notebooksConsistency,
  getAllNotebookIds,
  (consistency, notebookIds) => {
    for (const notebookId of  notebookIds) if (consistency[notebookId] !== true) return false;
    return true;
  }
);

export const getAllNotebooksFilter = createSelector(
  getAllNotebooks,
  getNotebookSearchMode,
  getNotebookSearchQuery,
  (notebooks, mode, query) => {
    if (mode === false || query === '') return notebooks;
    const q = query.toLowerCase();
    return notebooks.filter(nb => nb.name.toLowerCase().includes(q)).slice(0, 100);
  }
);

export const getAllNotesFilter = createSelector(
  getAllNotes,
  getNotebookSearchMode,
  getNotebookSearchQuery,
  (notes, mode, query) => {
    if (mode === false || query === '') return [];
    const q = query.toLowerCase();
    return notes.filter(n => n.title.toLowerCase().includes(q) || n.text.toLowerCase().includes(q)).slice(0, 100);
  }
);
