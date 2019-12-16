import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormValidationService} from '../../../core/services/form-validation.service';
import {UserRegisterResponse} from '../../../auth/model/user-register-response.model';
import {HttpService} from '../../../core/services/http.service';
import {SnackBarService} from '../../../core/services/snack-bar.service';
import {adaptErrorMessage} from '../../../core/services/app-properties.service';

export interface FeedbackDialogData {
  user: UserRegisterResponse;
}

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {
  isInProgress = false;
  lastErrorMessage = null;
  form: FormGroup;
  data: FeedbackDialogData;

  constructor(
    private http: HttpService,
    private snackBar: SnackBarService,
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {
    const user: UserRegisterResponse = this.data.user;
    const userName = [user.firstName, user.lastName].filter(s => s !== '').join(' ');
    this.form = this.fb.group({
      senderName: [userName, [Validators.required, Validators.maxLength(50)]],
      senderEmail: [user.email, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
      feedbackText: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  // TODO: remove hardcoded values
  // TODO: refactor errors handling
  get senderNameError() {
    const control = this.form.controls.senderName;
    console.log(control);
    return this.formValidationService.getValidationMessage(control, {maxlength: 50});
  }

  get senderEmailError() {
    const control = this.form.controls.senderEmail;
    return this.formValidationService.getValidationMessage(control, {minlength: 5, maxlength: 50});
  }

  get feedbackTextError() {
    const control = this.form.controls.feedbackText;
    return this.formValidationService.getValidationMessage(control, {maxlength: 500});
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) control.markAsTouched({onlySelf: true});
      else if (control instanceof FormGroup) this.validateAllFormFields(control);
    });
  }

  confirm() {
    if (!this.form.valid) {
      this.validateAllFormFields(this.form);
      return;
    }
    this.isInProgress = true;
    this.lastErrorMessage = null;
    this.http.postFeedbackRequest(this.form.value).subscribe(
      response => {
        this.snackBar.openSuccess(response.message);
        this.close();
      },
      er => {
        this.isInProgress = false;
        this.lastErrorMessage = adaptErrorMessage(er, 'Failed to post a feedback');
        this.snackBar.openError(this.lastErrorMessage);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
