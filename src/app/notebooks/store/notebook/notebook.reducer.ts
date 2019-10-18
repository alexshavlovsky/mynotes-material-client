import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Notebook} from './notebook.model';
import {NotebookActions, NotebookActionTypes} from './notebook.actions';
import {createFeatureSelector} from '@ngrx/store';
import {StoreRelevance} from '../store-relevance';

export const notebooksFeatureKey = 'notebooks';

export const selectNotebooksState = createFeatureSelector<NotebooksState>(notebooksFeatureKey);

export interface NotebooksState extends EntityState<Notebook> {
  relevance: StoreRelevance;
  spinner: boolean;
  searchMode: boolean;
  searchQuery: string;
}

export const adapter: EntityAdapter<Notebook> = createEntityAdapter<Notebook>();

export const initialState: NotebooksState = adapter.getInitialState({
  relevance: null,
  spinner: false,
  searchMode: false,
  searchQuery: '',
});

export function reducer(state = initialState, action: NotebookActions): NotebooksState {
  switch (action.type) {
    case NotebookActionTypes.InvalidateNotebooksStore: {
      return {
        ...state,
        relevance: null
      };
    }

    case NotebookActionTypes.FetchAllNotebooksApiCall: {
      return {
        ...state,
        spinner: true
      };
    }

    case NotebookActionTypes.FetchAllNotebooksSuccess: {
      return {
        ...state,
        relevance: action.payload.relevance,
        spinner: false
      };
    }

    case NotebookActionTypes.FetchAllNotebooksFailure: {
      return {
        ...state,
        spinner: false
      };
    }

    case NotebookActionTypes.ParentNotebookAtomicUpdate: {
      const notebookId = action.payload.notebookId;
      const notebook = state.entities[notebookId];
      const newSize = notebook.size + action.payload.sizeDelta;
      return {
        ...state,
        entities: {...state.entities, [notebookId]: {...notebook, size: newSize}}
      };
    }

    case NotebookActionTypes.SetNotebooksSearchMode: {
      return {
        ...state,
        searchMode: true
      };
    }

    case NotebookActionTypes.ResetNotebooksSearchMode: {
      return {
        ...state,
        searchMode: false
      };
    }

    case NotebookActionTypes.SearchQueryChange: {
      return {
        ...state,
        searchQuery: action.payload.searchQuery
      };
    }

    case NotebookActionTypes.AddNotebook: {
      return adapter.addOne(action.payload.notebook, state);
    }

    case NotebookActionTypes.UpsertNotebook: {
      return adapter.upsertOne(action.payload.notebook, state);
    }

    case NotebookActionTypes.AddNotebooks: {
      return adapter.addMany(action.payload.notebooks, state);
    }

    case NotebookActionTypes.UpsertNotebooks: {
      return adapter.upsertMany(action.payload.notebooks, state);
    }

    case NotebookActionTypes.UpdateNotebook: {
      return adapter.updateOne(action.payload.notebook, state);
    }

    case NotebookActionTypes.UpdateNotebooks: {
      return adapter.updateMany(action.payload.notebooks, state);
    }

    case NotebookActionTypes.DeleteNotebook: {
      return adapter.removeOne(action.payload.id, state);
    }

    case NotebookActionTypes.DeleteNotebooks: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case NotebookActionTypes.LoadNotebooks: {
      return adapter.addAll(action.payload.notebooks, state);
    }

    case NotebookActionTypes.ClearNotebooks: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
