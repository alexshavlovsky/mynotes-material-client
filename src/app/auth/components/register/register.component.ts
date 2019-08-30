import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppPropertiesService} from "../../../services/app-properties.service";
import {animations} from '../animations';
import {CrossFieldErrorMatcher, FormValidationService} from "../../../services/form-validation.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isRegisterInProgress, registerLastErrorMessage} from "../../store/auth.selectors";
import {RegisterRequest} from "../../store/auth.actions";
import {AuthState} from "../../store/auth.reducer";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../styles.css'],
  animations: [animations],
})
export class RegisterComponent implements OnInit {
  @HostBinding('@animations') animation = true;
  isInProgress$: Observable<boolean> = this.store.select(isRegisterInProgress);
  lastErrorMessage$: Observable<string> = this.store.select(registerLastErrorMessage);

  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher(this.appProps.passwordCrossFieldValidatorErrorKey);

  constructor(private appProps: AppPropertiesService,
              private formBuilder: FormBuilder,
              private formValidationService: FormValidationService,
              private store: Store<AuthState>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.appProps.userPasswordMinLength)]],
      confirmPassword: ''
    }, {
      validator: this.formValidationService.getCrossFieldEqualityValidator('password', 'confirmPassword', this.appProps.passwordCrossFieldValidatorErrorKey)
    });
  }

  get firstNameError() {
    const control = this.form.controls.firstName;
    return this.formValidationService.getValidationMessage(control);
  }

  get emailError() {
    const control = this.form.controls.email;
    return this.formValidationService.getValidationMessage(control);
  }

  get passwordError() {
    const control = this.form.controls.password;
    return this.formValidationService.getValidationMessage(control, {minlength: this.appProps.userPasswordMinLength});
  }

  get confirmPasswordError() {
    return this.formValidationService.getValidationMessage(this.form);
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.store.dispatch(new RegisterRequest({request: this.form.value}));
  }

}
