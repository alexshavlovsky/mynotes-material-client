import {Component, OnInit} from '@angular/core';
import {AppPropertiesService} from '../../services/app-properties.service';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {formAnimations} from '../common/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common/public-form.css'],
  animations: formAnimations
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
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
