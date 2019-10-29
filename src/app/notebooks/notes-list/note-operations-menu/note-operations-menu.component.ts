import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../shared/dialog/confirm-dialog/confirm-dialog.component';
import {filter, map} from 'rxjs/operators';
import {NoteDialogComponent, NoteDialogData, NoteDialogPayload} from '../note-dialog/note-dialog.component';
import {Note} from '../../store/note/note.model';
import {DeleteNoteRequest, UpdateNoteRequest} from '../../store/note/note.actions';

@Component({
  selector: 'app-note-operations-menu',
  templateUrl: './note-operations-menu.component.html',
  styleUrls: ['./note-operations-menu.component.css']
})
export class NoteOperationsMenuComponent implements OnInit {
  @Input() note: Note;

  constructor(private dialog: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  openDeleteDialog() {
    const data: ConfirmDialogData = {
      title: 'Delete note?',
      message: `Note [${this.note.title}] will be deleted`,
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      map(() => this.store.dispatch(new DeleteNoteRequest({
        id: this.note.id.toString(),
        notebookId: this.note.notebookId.toString()
      })))
    ).subscribe();
  }

  openEditDialog() {
    const data: NoteDialogData = {
      title: 'Edit the note',
      titlePlaceholder: 'Note title',
      titleCurrent: this.note.title,
      textPlaceholder: 'Note content',
      textCurrent: this.note.text,
      cancelButton: 'Cancel',
      confirmButton: 'Update',
    };
    this.dialog.open(NoteDialogComponent, {data}).afterClosed().pipe(
      filter((payload: NoteDialogPayload) => payload !== undefined),
      map(payload => this.store.dispatch(new UpdateNoteRequest({
        id: this.note.id.toString(),
        note: {
          title: payload.newTitle,
          text: payload.newText,
          notebookId: this.note.notebookId
        }
      })))
    ).subscribe();
  }

}
