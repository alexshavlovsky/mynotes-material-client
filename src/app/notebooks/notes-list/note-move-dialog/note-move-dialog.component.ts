import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {NotebooksState} from '../../store/notebook/notebook.reducer';
import {Observable} from 'rxjs';
import {Notebook} from '../../store/notebook/notebook.model';
import {getAllNotebooks} from '../../store/notebook/notebook.selectors';

export interface NoteMoveDialogData {
  title: string;
  currentNbId: number;
  cancelButton: string;
  confirmButton: string;
}

export interface NoteMoveDialogPayload {
  nbId: number;
}

@Component({
  selector: 'app-note-move-dialog',
  templateUrl: './note-move-dialog.component.html',
  styleUrls: ['./note-move-dialog.component.css']
})
export class NoteMoveDialogComponent implements OnInit {

  notebooks$: Observable<Notebook[]> = this.store.select(getAllNotebooks);
  data: NoteMoveDialogData;
  selection: number;

  constructor(private store: Store<NotebooksState>,
              private dialogRef: MatDialogRef<NoteMoveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
    this.selection = data.currentNbId;
  }

  ngOnInit() {
  }

  confirm() {
    const payload: NoteMoveDialogPayload = {
      nbId: this.selection
    };
    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }

  notChanged() {
    return this.selection === this.data.currentNbId;
  }

}
