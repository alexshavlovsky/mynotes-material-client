import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Notebook } from './notebook.model';
import { NotebookActions, NotebookActionTypes } from './notebook.actions';

export const notebooksFeatureKey = 'notebooks';

export interface State extends EntityState<Notebook> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Notebook> = createEntityAdapter<Notebook>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: NotebookActions
): State {
  switch (action.type) {
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

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
