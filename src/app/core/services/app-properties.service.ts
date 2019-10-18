import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

export interface ValidationMessageEntry {
  name: string;
  message: string | ((options: any) => string);
}

export function adaptErrorMessage(error: any, defaultMessage: string) {
  return error && error.error && error.error.message ? error.error.message : defaultMessage;
}

export function pathJoin(parts: string[]): string {
  return parts.join('/').replace(/[/]{2,}/g, '/');
}

@Injectable({
  providedIn: 'root'
})
export class AppPropertiesService {
  readonly appName = 'MyNotes';
  readonly passwordCrossFieldValidatorErrorKey = 'passwords';
  readonly userPasswordMinLength = 5;
  readonly validationMessages: ValidationMessageEntry[] = [
    {name: 'required', message: 'This field is required'},
    {name: 'minlength', message: f => `Please enter at least ${f.minlength} characters`},
    {name: 'email', message: 'Please enter a valid email address'},
    {name: this.passwordCrossFieldValidatorErrorKey, message: 'Passwords do not match'}
  ];
  readonly msgLoginFailure = 'Failed to sign in';
  readonly msgRegisterFailure = 'Failed to sign up';
  readonly msgRegisterSuccess = 'Your account has been created';
  readonly snackbarDefaultAction = 'close';
  readonly snackbarDefaultDelay = 5000;
  readonly lastModifiedDateFormat = 'dd/MM/yy HH:mm:ss';

  readonly API_USERS = 'users';
  readonly API_CURRENT_USER = 'current';
  readonly API_LOGIN = 'login';
  readonly API_COMMAND = 'command';
  readonly API_FEEDBACK = 'feedback';
  readonly API_NOTES = 'notes';
  readonly API_NOTEBOOKS = 'notebooks';
  readonly API_BASE_PATH = 'https://localhost:8443/api/';
  readonly API_USERS_PATH = pathJoin([this.API_BASE_PATH, this.API_USERS]);
  readonly API_LOGIN_PATH = pathJoin([this.API_USERS_PATH, this.API_LOGIN]);
  readonly API_CURRENT_USER_PATH = pathJoin([this.API_USERS_PATH, this.API_CURRENT_USER]);
  readonly API_COMMAND_PATH = pathJoin([this.API_BASE_PATH, this.API_COMMAND]);
  readonly API_FEEDBACK_PATH = pathJoin([this.API_BASE_PATH, this.API_FEEDBACK]);
  readonly API_NOTEBOOKS_PATH = pathJoin([this.API_BASE_PATH, this.API_NOTEBOOKS]);
  readonly API_NOTES_PATH = pathJoin([this.API_BASE_PATH, this.API_NOTES]);
  readonly API_DEFAULT_HEADERS = new HttpHeaders({Accept: 'application/json', 'Content-Type': 'application/json'});
}
