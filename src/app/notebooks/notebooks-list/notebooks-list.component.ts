import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Notebook} from '../store/notebook/notebook.model';
import {NotebooksState} from '../store/notebook/notebook.reducer';
import {Store} from '@ngrx/store';
import {
  CreateNotebookRequest,
  ResetNotebooksSearchMode,
  SearchQueryChange,
  SetNotebooksSearchMode
} from '../store/notebook/notebook.actions';
import {NotebookDialogComponent, NotebookDialogData, NotebookDialogPayload} from './notebook-dialog/notebook-dialog.component';
import {debounceTime, distinctUntilChanged, filter, map, take, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {FetchAllNotesRequest} from '../store/note/note.actions';
import {
  getAllNotebooksFilter, getAllNotesFilter,
  getNotebookSearchMode,
  getNotebookSearchQuery,
  notebooksConsistency,
  notebooksSpinner
} from '../store/notebook/notebook.selectors';
import {Note} from '../store/note/note.model';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
})
export class NotebooksListComponent implements OnInit {

  notebooks$: Observable<Notebook[]> = this.store.select(getAllNotebooksFilter);
  notesFilter$: Observable<Note[]> = this.store.select(getAllNotesFilter);
  spinner$: Observable<boolean> = this.store.select(notebooksSpinner);
  notebooksConsistency$: Observable<{ [notebookId: string]: boolean }> = this.store.select(notebooksConsistency);
  searchMode$: Observable<boolean> = this.store.select(getNotebookSearchMode);
  searchQuery;
  searchQueryChanged: Subject<string> = new Subject<string>();
  @ViewChild('search', {static: false}) searchElement: ElementRef;

  constructor(private store: Store<NotebooksState>,
              private dialog: MatDialog,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    // init search query by value from store
    this.store.select(getNotebookSearchQuery).pipe(
      take(1),
      tap(searchQuery => this.searchQuery = searchQuery)
    ).subscribe();
    // update store if search query is changed
    this.searchQueryChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(searchQuery => this.store.dispatch(new SearchQueryChange({searchQuery})))
    ).subscribe();
  }

  openCreateNotebookDialog() {
    const data: NotebookDialogData = {
      title: 'Create a notebook',
      namePlaceholder: 'Notebook name',
      nameCurrent: '',
      cancelButton: 'Cancel',
      confirmButton: 'Create',
    };
    this.dialog.open(NotebookDialogComponent, {data}).afterClosed().pipe(
      filter((payload: NotebookDialogPayload) => payload !== undefined),
      map(payload => this.store.dispatch(new CreateNotebookRequest({notebook: {name: payload.newName}})))
    ).subscribe();
  }

  enableSearch() {
    this.store.dispatch(new SetNotebooksSearchMode());
    this.cd.detectChanges();
    this.searchElement.nativeElement.focus();
    this.store.dispatch(new FetchAllNotesRequest());
  }

  disableSearch() {
    this.store.dispatch(new ResetNotebooksSearchMode());
  }

}
