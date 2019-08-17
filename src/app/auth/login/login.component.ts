import {Component, OnInit} from '@angular/core';
import {AppPropertiesService} from '../../services/app-properties.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {authAnimation} from '../shared/auth.animation';
import {FormValidationService} from "../../services/form-validation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared/auth.css'],
  animations: [authAnimation],
  host: {
    '[@authAnimation]': 'true'
  }
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private appProps: AppPropertiesService,
              private formBuilder: FormBuilder,
              private formValidationService: FormValidationService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.appProps.userPasswordMinLength)]],
    });
  }

  get emailError() {
    const control = this.form.controls.email;
    return this.formValidationService.getValidationMessage(control);
  }

  get passwordError() {
    const control = this.form.controls.password;
    return this.formValidationService.getValidationMessage(control, {minlength: this.appProps.userPasswordMinLength});
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}
