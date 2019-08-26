import {Component, HostBinding, OnInit} from '@angular/core';
import {AppPropertiesService} from '../../../services/app-properties.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animations} from '../animations';
import {FormValidationService} from "../../../services/form-validation.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../reducers";
import {LoginRequest} from "../../store/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles.css'],
  animations: [animations],
})
export class LoginComponent implements OnInit {
  @HostBinding('@animations') animation = true;

  form: FormGroup;

  constructor(private appProps: AppPropertiesService,
              private formBuilder: FormBuilder,
              private formValidationService: FormValidationService,
              private store: Store<AppState>) {
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
    this.store.dispatch(new LoginRequest({userLoginRequest: this.form.value}));
  }

}