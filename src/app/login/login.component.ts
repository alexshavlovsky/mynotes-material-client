import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppPropertiesService} from '../services/app-properties.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private appProperties: AppPropertiesService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get emailError() {
    const control = this.form.controls.email;
    return control.hasError('required') ? this.appProperties.valMsgEmailRequired :
      control.hasError('email') ? this.appProperties.valMsgEmailInvalid :
        null;
  }

  get passwordError() {
    const control = this.form.controls.password;
    return control.hasError('required') ? this.appProperties.valMsgPasswordRequired :
      control.hasError('minlength') ? this.appProperties.valMsgPasswordMinLength :
        null;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}
