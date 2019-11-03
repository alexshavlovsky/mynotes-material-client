import {Inject, Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {IEnvConfig} from '../env.injector';

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

  constructor(@Inject('ENV_CONFIG') private envConfig: IEnvConfig) {
    if (envConfig.override) {
      const override = envConfig.override;
      for (const key in override)
        if (this.hasOwnProperty(key))
          this[key] = override[key];
    }
  }

  appName = 'MyNotes';

  passwordCrossFieldValidatorErrorKey = 'passwords';
  userPasswordMinLength = 5;
  validationMessages: ValidationMessageEntry[] = [
    {name: 'required', message: 'This field is required'},
    {name: 'minlength', message: f => `Please enter at least ${f.minlength} characters`},
    {name: 'email', message: 'Please enter a valid email address'},
    {name: this.passwordCrossFieldValidatorErrorKey, message: 'Passwords do not match'}
  ];

  SNACK_BAR_DEF_ACTION = 'close';
  SNACK_BAR_DEF_DELAY = 5000;
  DATE_FMT = 'dd/MM/yyyy';
  DATE_TIME_FMT = `${this.DATE_FMT} HH:mm:ss`;

  API_USERS = 'users';
  API_CURRENT_USER = 'current';
  API_LOGIN = 'login';
  API_COMMAND = 'command';
  API_FEEDBACK = 'feedback';
  API_NOTES = 'notes';
  API_NOTES_XLS = 'export/xls';
  API_NOTEBOOKS = 'notebooks';
  API_BASE_PATH = this.envConfig.apiBaseUrl;
  API_USERS_PATH = pathJoin([this.API_BASE_PATH, this.API_USERS]);
  API_LOGIN_PATH = pathJoin([this.API_USERS_PATH, this.API_LOGIN]);
  API_CURRENT_USER_PATH = pathJoin([this.API_USERS_PATH, this.API_CURRENT_USER]);
  API_COMMAND_PATH = pathJoin([this.API_BASE_PATH, this.API_COMMAND]);
  API_FEEDBACK_PATH = pathJoin([this.API_BASE_PATH, this.API_FEEDBACK]);
  API_NOTEBOOKS_PATH = pathJoin([this.API_BASE_PATH, this.API_NOTEBOOKS]);
  API_NOTES_PATH = pathJoin([this.API_BASE_PATH, this.API_NOTES]);
  API_NOTES_XLS_PATH = pathJoin([this.API_BASE_PATH, this.API_NOTES, this.API_NOTES_XLS]);
  API_DEFAULT_HEADERS = new HttpHeaders({Accept: 'application/json', 'Content-Type': 'application/json'});
  API_EXCEL_HEADERS = new HttpHeaders({Accept: 'application/vnd.ms-excel, application/json'});
}
