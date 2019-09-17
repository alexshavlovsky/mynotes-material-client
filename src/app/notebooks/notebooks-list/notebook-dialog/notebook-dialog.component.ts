import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface NotebookDialogData {
  title: string;
  namePlaceholder: string;
  nameCurrent: string;
  cancelButton: string;
  confirmButton: string;
}

export interface NotebookDialogPayload {
  newName: string;
}

@Component({
  selector: 'app-notebook-dialog',
  templateUrl: './notebook-dialog.component.html',
  styleUrls: ['./notebook-dialog.component.css']
})
export class NotebookDialogComponent implements OnInit {
  form: FormGroup;
  data: NotebookDialogData;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NotebookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      nameInput: [this.data.nameCurrent, []],
    });
  }

  confirm() {
    const payload: NotebookDialogPayload = {
      newName: this.form.value.nameInput
    };
    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }

}
