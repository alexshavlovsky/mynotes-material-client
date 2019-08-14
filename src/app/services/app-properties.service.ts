import {Injectable} from '@angular/core';

export interface validationMessageEntry {
  name: string;
  message: string | ((options: any) => string);
}

@Injectable({
  providedIn: 'root'
})
export class AppPropertiesService {
  readonly appName = 'MyNotes';
  readonly passwordCrossFieldValidatorErrorKey = 'passwords';
  readonly userPasswordMinLength = 5;
  readonly validationMessages: validationMessageEntry[] = [
    {name: 'required', message: 'This field is required'},
    {name: 'minlength', message: f => `Please enter at least ${f.minlength} characters`},
    {name: 'email', message: 'Please enter a valid email address'},
    {name: this.passwordCrossFieldValidatorErrorKey, message: 'Passwords do not match'}
  ];
}
