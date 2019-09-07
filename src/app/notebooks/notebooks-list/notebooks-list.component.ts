import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Notebook} from '../store/notebook/notebook.model';
import {getAllNotebooks, NotebooksState} from '../store/notebook/notebook.reducer';
import {Store} from '@ngrx/store';
import {DeleteNotebookRequest, RenameNotebookRequest} from '../store/notebook/notebook.actions';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
})
export class NotebooksListComponent implements OnInit {

  notebooks$: Observable<Notebook[]> = this.store.select(getAllNotebooks);

  constructor(private store: Store<NotebooksState>) {
  }

  ngOnInit() {
  }

  deleteNotebook(notebookId: number) {
    this.store.dispatch(new DeleteNotebookRequest({id: notebookId.toString()}));
  }

  renameNotebook(notebookId: number, name: string) {
    this.store.dispatch(new RenameNotebookRequest({id: notebookId.toString(), name}));
  }

}
