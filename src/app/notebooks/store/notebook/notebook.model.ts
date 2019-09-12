import {NotebookResponse} from '../../../core/model/notebook-response.model';

export interface Notebook {
  id: number;
  name: string;
  size: number;
}

export function notebookResponseAdapter(response: NotebookResponse): Notebook {
  return {
    id: response.id,
    name: response.name,
    size: response.size,
  };
}
