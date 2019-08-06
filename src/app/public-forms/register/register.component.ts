import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {AppPropertiesService} from "../../services/app-properties.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common/public-form.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'Your first name',
        required: true,
      },
    },
    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        label: 'Your last name',
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Your email',
        type: 'email',
        required: true,
      },
      validators: {
        validation: ['email'],
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Your password',
        type: 'password',
        required: true,
        minLength: 5,
      },
    },
    {
      key: 'confirmPassword',
      type: 'input',
      templateOptions: {
        label: 'Confirm password',
        type: 'password',
        required: true,
      },
      validators: {
        fieldMatch: {
          expression: (control) => control.value === this.model.password,
          message: 'Passwords do not match',
        },
      },
      expressionProperties: {
        'templateOptions.disabled': () => !this.form.get('password').valid,
      },
      lifecycle: {
        onInit: (form, field) => {
          form.get('password').valueChanges.pipe(
            takeUntil(this.onDestroy$),
            tap(() => {
              field.formControl.updateValueAndValidity();
            })
          ).subscribe();
        }
      },
    },
  ];

  constructor(private appProperties: AppPropertiesService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}
