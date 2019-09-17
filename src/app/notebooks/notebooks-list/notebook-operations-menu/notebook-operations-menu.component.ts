import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogData} from '../confirm-dialog/confirm-dialog.component';
import {filter, map} from 'rxjs/operators';
import {
  NotebookDialogComponent,
  NotebookDialogData,
  NotebookDialogPayload
} from '../notebook-dialog/notebook-dialog.component';
import {Notebook} from '../../store/notebook/notebook.model';
import {DeleteNotebookRequest, RenameNotebookRequest} from '../../store/notebook/notebook.actions';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {NoteDialogComponent, NoteDialogData, NoteDialogPayload} from '../note-dialog/note-dialog.component';
import {CreateNoteRequest} from '../../store/note/note.actions';

@Component({
  selector: 'app-notebook-operations-menu',
  templateUrl: './notebook-operations-menu.component.html',
  styleUrls: ['./notebook-operations-menu.component.css']
})
export class NotebookOperationsMenuComponent implements OnInit {
  @Input() notebook: Notebook;
  @Output() add = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  openDeleteDialog() {
    const data: ConfirmDialogData = {
      title: 'Delete notebook?',
      message: 'The notebook with all contained notes will be deleted',
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      map(() => this.store.dispatch(new DeleteNotebookRequest({id: this.notebook.id.toString()})))
    ).subscribe();
  }

  openEditDialog() {
    const data: NotebookDialogData = {
      title: 'Rename notebook',
      namePlaceholder: 'New name',
      nameCurrent: this.notebook.name,
      cancelButton: 'Cancel',
      confirmButton: 'Rename',
    };
    this.dialog.open(NotebookDialogComponent, {data}).afterClosed().pipe(
      filter((payload: NotebookDialogPayload) => payload !== undefined && payload.newName !== this.notebook.name),
      map(payload => this.store.dispatch(new RenameNotebookRequest({
        id: this.notebook.id.toString(),
        name: payload.newName
      })))
    ).subscribe();
  }

  openCreateNoteDialog() {
    const data: NoteDialogData = {
      title: 'Create a note',
      titlePlaceholder: 'Note title',
      titleCurrent: '',
      textPlaceholder: 'Note content',
      textCurrent: '',
      cancelButton: 'Cancel',
      confirmButton: 'Create',
    };
    this.dialog.open(NoteDialogComponent, {data}).afterClosed().pipe(
      filter((payload: NoteDialogPayload) => payload !== undefined),
      map(payload => this.store.dispatch(new CreateNoteRequest({
        note: {
          title: payload.newTitle,
          text: payload.newText,
          notebookId: this.notebook.id
        }
      })))
    ).subscribe();
  }

}
