import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Notebook} from './notebook.model';

export enum NotebookActionTypes {
  FetchAllNotebooksRequest = '[Notebooks Container] Fetch All Notebooks Request',
  FetchAllNotebooksSuccess = '[Notebooks Container] Fetch All Notebooks Success',

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

export class FetchAllNotebooksSuccess implements Action {
  readonly type = NotebookActionTypes.FetchAllNotebooksSuccess;

  constructor(public payload: { notebooks: Notebook[], withUserId: string }) {
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
  FetchAllNotebooksRequest | FetchAllNotebooksSuccess
  | LoadNotebooks
  | AddNotebook
  | UpsertNotebook
  | AddNotebooks
  | UpsertNotebooks
  | UpdateNotebook
  | UpdateNotebooks
  | DeleteNotebook
  | DeleteNotebooks
  | ClearNotebooks  ;
