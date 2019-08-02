import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {AppPropertiesService} from "../services/app-properties.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    }
  ];

  constructor(private appProperties: AppPropertiesService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}


// this.form = this.formBuilder.group({
//   firstName: ['', Validators.required],
//   lastName: [''],
//   email: ['', [Validators.required, Validators.email]],
//   password: ['', [Validators.required, Validators.minLength(5)]],
//   confirmPassword: ['']
// }, {validator: RegisterComponent.checkPasswords});
