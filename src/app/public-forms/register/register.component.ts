import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppPropertiesService} from "../../services/app-properties.service";
import {formAnimations} from '../common/animations';
import {CrossFieldErrorMatcher, FormValidationService} from "../../services/form-validation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common/public-form.css'],
  animations: [formAnimations],
  host: {
    '[@formAnimations]': 'true'
  }
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher(this.appProps.passwordCrossFieldValidatorErrorKey);

  constructor(private appProps: AppPropertiesService,
              private formBuilder: FormBuilder,
              private formValidationService: FormValidationService) {
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
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}
