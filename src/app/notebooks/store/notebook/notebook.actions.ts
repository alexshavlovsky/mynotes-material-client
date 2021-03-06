import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Notebook} from './notebook.model';
import {NotebookRequest} from '../../../core/model/notebook-request.model';
import {NotebookResponse} from '../../../core/model/notebook-response.model';
import {StoreRelevance} from '../store-relevance';

export enum NotebookActionTypes {
  FetchAllNotebooksRequest = '[Notebooks Container] Fetch All Notebooks Request',
  FetchAllNotebooksApiCall = '[Store Cache Core] Fetch All Notebooks API call',
  FetchAllNotebooksSuccess = '[API] Fetch All Notebooks Success',
  FetchAllNotebooksFailure = '[API] Fetch All Notebooks Failure',

  CreateNotebookRequest = '[Notebooks Container] Create Notebook Request',
  UpdateNotebookRequest = '[Notebooks Container] Rename Notebook Request',
  DeleteNotebookRequest = '[Notebooks Container] Delete Notebook Request',

  InvalidateNotebooksStore = '[Notebooks Container/UI] Invalidate Notebooks Store',
  ParentNotebookAtomicUpdate = '[Child Note Effect] Parent Notebook Atomic Update',

  SetNotebooksSearchMode = '[Notebooks List Page] Set Notebooks search mode',
  ResetNotebooksSearchMode = '[Notebooks List Page] Reset Notebooks search mode',
  SearchQueryChange = '[Notebooks List Page] Search Query Change',

  LoadNotebooks = '[Notebook] Load Notebooks',
  AddNotebook = '[Notebook] Add Notebook',
  UpsertNotebook = '[Notebook] Upsert Notebook',
  AddNotebooks = '[Notebook] Add Notebooks',
  UpsertNotebooks = '[Notebook] Upsert Notebooks',
  UpdateNotebook = '[Notebook] Update Notebook',
  UpdateNotebooks = '[Notebook] Update Notebooks',
  DeleteNotebook = '[Notebook] Delete Notebook',
  DeleteNotebooks = '[Notebook] Delete Notebooks',
  ClearNotebooks = '[Notebook] Clear Notebooks',
}

export class FetchAllNotebooksRequest implements Action {
  readonly type = NotebookActionTypes.FetchAllNotebooksRequest;
}

export class FetchAllNotebooksApiCall implements Action {
  readonly type = NotebookActionTypes.FetchAllNotebooksApiCall;
}

export class FetchAllNotebooksSuccess implements Action {
  readonly type = NotebookActionTypes.FetchAllNotebooksSuccess;

  constructor(public payload: { response: NotebookResponse[], relevance: StoreRelevance }) {
  }
}

export class FetchAllNotebooksFailure implements Action {
  readonly type = NotebookActionTypes.FetchAllNotebooksFailure;

  constructor(public payload: { message: string }) {
  }
}

export class CreateNotebookRequest implements Action {
  readonly type = NotebookActionTypes.CreateNotebookRequest;

  constructor(public payload: { notebook: NotebookRequest }) {
  }
}

export class UpdateNotebookRequest implements Action {
  readonly type = NotebookActionTypes.UpdateNotebookRequest;

  constructor(public payload: { id: string, notebook: NotebookRequest }) {
  }
}

export class DeleteNotebookRequest implements Action {
  readonly type = NotebookActionTypes.DeleteNotebookRequest;

  constructor(public payload: { id: string }) {
  }
}

export class InvalidateNotebooksStore implements Action {
  readonly type = NotebookActionTypes.InvalidateNotebooksStore;
}

export class ParentNotebookAtomicUpdate implements Action {
  readonly type = NotebookActionTypes.ParentNotebookAtomicUpdate;

  constructor(public payload: { notebookId: string, sizeDelta: number }) {
  }
}

export class SetNotebooksSearchMode implements Action {
  readonly type = NotebookActionTypes.SetNotebooksSearchMode;
}

export class ResetNotebooksSearchMode implements Action {
  readonly type = NotebookActionTypes.ResetNotebooksSearchMode;
}

export class SearchQueryChange implements Action {
  readonly type = NotebookActionTypes.SearchQueryChange;

  constructor(public payload: { searchQuery: string }) {
  }

}

export class LoadNotebooks implements Action {
  readonly type = NotebookActionTypes.LoadNotebooks;

  constructor(public payload: { notebooks: Notebook[] }) {
  }
}

export class AddNotebook implements Action {
  readonly type = NotebookActionTypes.AddNotebook;

  constructor(public payload: { notebook: Notebook }) {
  }
}

export class UpsertNotebook implements Action {
  readonly type = NotebookActionTypes.UpsertNotebook;

  constructor(public payload: { notebook: Notebook }) {
  }
}

export class AddNotebooks implements Action {
  readonly type = NotebookActionTypes.AddNotebooks;

  constructor(public payload: { notebooks: Notebook[] }) {
  }
}

export class UpsertNotebooks implements Action {
  readonly type = NotebookActionTypes.UpsertNotebooks;

  constructor(public payload: { notebooks: Notebook[] }) {
  }
}

export class UpdateNotebook implements Action {
  readonly type = NotebookActionTypes.UpdateNotebook;

  constructor(public payload: { notebook: Update<Notebook> }) {
  }
}

export class UpdateNotebooks implements Action {
  readonly type = NotebookActionTypes.UpdateNotebooks;

  constructor(public payload: { notebooks: Update<Notebook>[] }) {
  }
}

export class DeleteNotebook implements Action {
  readonly type = NotebookActionTypes.DeleteNotebook;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteNotebooks implements Action {
  readonly type = NotebookActionTypes.DeleteNotebooks;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearNotebooks implements Action {
  readonly type = NotebookActionTypes.ClearNotebooks;
}

export type NotebookActions =
  FetchAllNotebooksRequest
  | FetchAllNotebooksApiCall
  | FetchAllNotebooksSuccess
  | FetchAllNotebooksFailure
  | DeleteNotebookRequest
  | UpdateNotebookRequest
  | CreateNotebookRequest
  | InvalidateNotebooksStore
  | ParentNotebookAtomicUpdate
  | SetNotebooksSearchMode
  | ResetNotebooksSearchMode
  | SearchQueryChange
  | LoadNotebooks
  | AddNotebook
  | UpsertNotebook
  | AddNotebooks
  | UpsertNotebooks
  | UpdateNotebook
  | UpdateNotebooks
  | DeleteNotebook
  | DeleteNotebooks
  | ClearNotebooks;
