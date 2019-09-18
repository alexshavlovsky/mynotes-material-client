import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Note} from './note.model';
import {NoteResponse} from '../../../core/model/note-response.model';
import {NoteRequest} from '../../../core/model/note-request.model';

export enum NoteActionTypes {
  FetchNotesByNotebookIdRequest = '[Notes List Page] Fetch Notes By Notebook Id Request',
  FetchNotesByNotebookIdApiCall = '[Store Cache Core] Fetch Notes By Notebook Id API call',
  FetchNotesByNotebookIdSuccess = '[API] Fetch Notes By Notebook Id Success',
  FetchNotesByNotebookIdFailure = '[API] Fetch Notes By Notebook Id Failure',

  FetchAllNotesRequest = '[Notebooks Container] Fetch All Notes Request',
  FetchAllNotesApiCall = '[Store Cache Core] Fetch All Notes API call',
  FetchAllNotesSuccess = '[API] Fetch All Notes Success',
  FetchAllNotesFailure = '[API] Fetch All Notes Failure',

  CreateNoteRequest = '[Notebooks Container] Create Note Request',
  UpdateNoteRequest = '[Notebooks Container] Update Note Request',
  DeleteNoteRequest = '[Notebooks Container] Delete Note Request',

  LoadNotes = '[Note] Load Notes',
  AddNote = '[Note] Add Note',
  UpsertNote = '[Note] Upsert Note',
  AddNotes = '[Note] Add Notes',
  UpsertNotes = '[Note] Upsert Notes',
  UpdateNote = '[Note] Update Note',
  UpdateNotes = '[Note] Update Notes',
  DeleteNote = '[Note] Delete Note',
  DeleteNotes = '[Note] Delete Notes',
  ClearNotes = '[Note] Clear Notes'
}


export class FetchNotesByNotebookIdRequest implements Action {
  readonly type = NoteActionTypes.FetchNotesByNotebookIdRequest;

  constructor(public payload: { notebookId: string }) {
  }
}

export class FetchNotesByNotebookIdApiCall implements Action {
  readonly type = NoteActionTypes.FetchNotesByNotebookIdApiCall;

  constructor(public payload: { notebookId: string }) {
  }
}

export class FetchNotesByNotebookIdSuccess implements Action {
  readonly type = NoteActionTypes.FetchNotesByNotebookIdSuccess;

  constructor(public payload: { response: NoteResponse[], notebookId: string }) {
  }
}

export class FetchNotesByNotebookIdFailure implements Action {
  readonly type = NoteActionTypes.FetchNotesByNotebookIdFailure;

  constructor(public payload: { message: string, notebookId: string }) {
  }
}

export class FetchAllNotesRequest implements Action {
  readonly type = NoteActionTypes.FetchAllNotesRequest;
}

export class FetchAllNotesApiCall implements Action {
  readonly type = NoteActionTypes.FetchAllNotesApiCall;
}

export class FetchAllNotesSuccess implements Action {
  readonly type = NoteActionTypes.FetchAllNotesSuccess;

  constructor(public payload: { response: NoteResponse[] }) {
  }
}

export class FetchAllNotesFailure implements Action {
  readonly type = NoteActionTypes.FetchAllNotesFailure;

  constructor(public payload: { message: string }) {
  }
}

export class CreateNoteRequest implements Action {
  readonly type = NoteActionTypes.CreateNoteRequest;

  constructor(public payload: { note: NoteRequest }) {
  }
}

export class UpdateNoteRequest implements Action {
  readonly type = NoteActionTypes.UpdateNoteRequest;

  constructor(public payload: { id: string; note: NoteRequest }) {
  }
}

export class DeleteNoteRequest implements Action {
  readonly type = NoteActionTypes.DeleteNoteRequest;

  constructor(public payload: { id: string, notebookId: string }) {
  }
}

export class LoadNotes implements Action {
  readonly type = NoteActionTypes.LoadNotes;

  constructor(public payload: { notes: Note[] }) {
  }
}

export class AddNote implements Action {
  readonly type = NoteActionTypes.AddNote;

  constructor(public payload: { note: Note }) {
  }
}

export class UpsertNote implements Action {
  readonly type = NoteActionTypes.UpsertNote;

  constructor(public payload: { note: Note }) {
  }
}

export class AddNotes implements Action {
  readonly type = NoteActionTypes.AddNotes;

  constructor(public payload: { notes: Note[] }) {
  }
}

export class UpsertNotes implements Action {
  readonly type = NoteActionTypes.UpsertNotes;

  constructor(public payload: { notes: Note[] }) {
  }
}

export class UpdateNote implements Action {
  readonly type = NoteActionTypes.UpdateNote;

  constructor(public payload: { note: Update<Note> }) {
  }
}

export class UpdateNotes implements Action {
  readonly type = NoteActionTypes.UpdateNotes;

  constructor(public payload: { notes: Update<Note>[] }) {
  }
}

export class DeleteNote implements Action {
  readonly type = NoteActionTypes.DeleteNote;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteNotes implements Action {
  readonly type = NoteActionTypes.DeleteNotes;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearNotes implements Action {
  readonly type = NoteActionTypes.ClearNotes;
}

export type NoteActions =
  FetchNotesByNotebookIdRequest
  | FetchNotesByNotebookIdApiCall
  | FetchNotesByNotebookIdSuccess
  | FetchNotesByNotebookIdFailure
  | FetchAllNotesRequest
  | FetchAllNotesApiCall
  | FetchAllNotesSuccess
  | FetchAllNotesFailure
  | CreateNoteRequest
  | UpdateNoteRequest
  | DeleteNoteRequest
  | LoadNotes
  | AddNote
  | UpsertNote
  | AddNotes
  | UpsertNotes
  | UpdateNote
  | UpdateNotes
  | DeleteNote
  | DeleteNotes
  | ClearNotes;
