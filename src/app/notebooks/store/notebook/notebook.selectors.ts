import {createSelector} from '@ngrx/store';
import {adapter, selectNotebooksState} from './notebook.reducer';

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

export const getAllNotebooks = createSelector(
  selectNotebooksState,
  selectAll
);

export const getAllNotebookEntities = createSelector(
  selectNotebooksState,
  selectEntities
);

export const getNotebookById = createSelector(
  getAllNotebookEntities,
  (notebooks, props) => notebooks[props.notebookId]
);
