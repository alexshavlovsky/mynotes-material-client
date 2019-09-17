import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface NoteDialogData {
  title: string;
  titlePlaceholder: string;
  titleCurrent: string;
  textPlaceholder: string;
  textCurrent: string;
  cancelButton: string;
  confirmButton: string;
}

export interface NoteDialogPayload {
  newTitle: string;
  newText: string;
}

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {
  form: FormGroup;
  data: NoteDialogData;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      titleInput: [this.data.titleCurrent, []],
      textInput: [this.data.textCurrent, []],
    });
  }

  confirm() {
    const payload: NoteDialogPayload = {
      newTitle: this.form.value.titleInput,
      newText: this.form.value.textInput
    };
    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }

}
