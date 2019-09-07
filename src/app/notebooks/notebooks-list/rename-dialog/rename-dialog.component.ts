import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface RenameDialogData {
  title: string;
  placeholder: string;
  initialValue: string;
  cancelButton: string;
  confirmButton: string;
}

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {

  form: FormGroup;

  data: RenameDialogData;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RenameDialogComponent>,
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
