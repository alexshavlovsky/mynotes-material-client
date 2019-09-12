import {NoteResponse} from '../../../core/model/note-response.model';

export interface Note {
  id: number;
  title: string;
  text: string;
  notebookId: number;
  lastModifiedOn: Date;
}

export function noteResponseAdapter(response: NoteResponse): Note {
  return {
    id: response.id,
    title: response.title,
    text: response.text,
    notebookId: response.notebookId,
    lastModifiedOn: response.lastModifiedOn,
  };
}
