import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface NotebookDialogData {
  title: string;
  placeholder: string;
  initialValue: string;
  cancelButton: string;
  confirmButton: string;
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
      value: [this.data.initialValue, []],
    });
  }

  confirm() {
    this.dialogRef.close(this.form.value.value);
  }

  close() {
    this.dialogRef.close();
  }

}
