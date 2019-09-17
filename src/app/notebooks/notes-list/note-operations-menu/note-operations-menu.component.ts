import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../notebooks-list/confirm-dialog/confirm-dialog.component';
import {filter} from 'rxjs/operators';
import {NoteDialogComponent, NoteDialogData, NoteDialogPayload} from '../note-dialog/note-dialog.component';
import {Note} from '../../store/note/note.model';

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
      message: 'The note will be deleted',
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
// TODO: Implement delete note API call and Action
//      map(() => this.store.dispatch(new DeleteNoteRequest({id: this.note.id.toString()})))
    ).subscribe();
  }

  openEditDialog() {
    const data: NoteDialogData = {
      title: 'Edit note',
      titlePlaceholder: 'Note title',
      titleCurrent: this.note.title,
      textPlaceholder: 'Note content',
      textCurrent: this.note.text,
      cancelButton: 'Cancel',
      confirmButton: 'Update',
    };
    this.dialog.open(NoteDialogComponent, {data}).afterClosed().pipe(
      filter((payload: NoteDialogPayload) => payload !== undefined),
      // TODO: Implement update note API call and Action
      // map(payload => this.store.dispatch(new CreateNoteRequest({
      //   note: {
      //     title: payload.newTitle,
      //     text: payload.newText,
      //     notebookId: this.note.notebookId
      //   }
      // })))
    ).subscribe();
  }

}
