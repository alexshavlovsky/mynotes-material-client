import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Notebook} from '../store/notebook/notebook.model';
import {getAllNotebooks, NotebooksState} from '../store/notebook/notebook.reducer';
import {Store} from '@ngrx/store';
import {CreateNotebookRequest, DeleteNotebookRequest, RenameNotebookRequest} from '../store/notebook/notebook.actions';
import {NotebookDialogComponent, NotebookDialogData} from './notebook-dialog/notebook-dialog.component';
import {filter, map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
})
export class NotebooksListComponent implements OnInit {

  notebooks$: Observable<Notebook[]> = this.store.select(getAllNotebooks);

  constructor(private store: Store<NotebooksState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  deleteNotebook(notebookId: number) {
    this.store.dispatch(new DeleteNotebookRequest({id: notebookId.toString()}));
  }

  renameNotebook(notebookId: number, name: string) {
    this.store.dispatch(new RenameNotebookRequest({id: notebookId.toString(), name}));
  }

  openCreateNotebookDialog() {
    const data: NotebookDialogData = {
      title: 'Create a notebook',
      placeholder: 'Notebook name',
      initialValue: '',
      cancelButton: 'Cancel',
      confirmButton: 'Create',
    };
    this.dialog.open(NotebookDialogComponent, {data}).afterClosed().pipe(
      filter(value => value !== undefined),
      map(value => this.store.dispatch(new CreateNotebookRequest({notebook: {name: value}})))
    ).subscribe();
  }


}
