import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Notebook} from '../store/notebook/notebook.model';
import {getAllNotebooks, notebooksSpinner, NotebooksState} from '../store/notebook/notebook.reducer';
import {Store} from '@ngrx/store';
import {CreateNotebookRequest} from '../store/notebook/notebook.actions';
import {NotebookDialogComponent, NotebookDialogData} from './notebook-dialog/notebook-dialog.component';
import {filter, map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {notesRelevance} from '../store/note/note.reducer';
import {StoreRelevance} from '../store/store-relevance';
import {FetchAllNotesRequest} from '../store/note/note.actions';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
})
export class NotebooksListComponent implements OnInit {

  notebooks$: Observable<Notebook[]> = this.store.select(getAllNotebooks);
  spinner$: Observable<boolean> = this.store.select(notebooksSpinner);
  notesRelevance$: Observable<{ [notebookId: string]: StoreRelevance }> = this.store.select(notesRelevance);

  constructor(private store: Store<NotebooksState>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
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

  refreshNotebooks() {
//    this.store.dispatch(new InvalidateNotebooksStore());
//    this.store.dispatch(new FetchAllNotebooksRequest());
    this.store.dispatch(new FetchAllNotesRequest());
  }
}
