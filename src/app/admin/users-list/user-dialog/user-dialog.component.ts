import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../core/services/auth.service';

export interface UserDialogData {
  email: string;
  roles: number;
  enabled: boolean;
}

export interface UserDialogPayload {
  roles: number;
  enabled: boolean;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  form: FormGroup;
  data: UserDialogData;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      hasRoleAdmin: new FormControl(this.auth.hasRoleAdmin(this.data.roles)),
      hasRoleUser: new FormControl(this.auth.hasRoleUser(this.data.roles)),
      isAccountEnabled: new FormControl(this.data.enabled)
    });
  }

  confirm() {
    const payload: UserDialogPayload = {
      roles: this.auth.packRoles(this.form.value.hasRoleAdmin, this.form.value.hasRoleUser),
      enabled: this.form.value.isAccountEnabled
    };
    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }

}
