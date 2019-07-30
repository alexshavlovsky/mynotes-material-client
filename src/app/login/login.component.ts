import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get emailError() {
    const control = this.form.controls.email;
    return control.hasError('required') ? 'Email is required' :
      control.hasError('email') ? 'Email must be a valid email address' :
        null;
  }

  get passwordError() {
    const control = this.form.controls.password;
    return control.hasError('required') ? 'Password is required' :
      control.hasError('minlength') ? 'Password must be at least 5 characters long' :
        null;
  }

  onSubmit() {
    if (!this.form.valid) return;
    console.log(this.form.value);
  }

}
