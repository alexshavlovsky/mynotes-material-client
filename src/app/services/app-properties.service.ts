import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppPropertiesService {
  readonly appName: string = 'MyNotes';
  readonly valMsgEmailRequired = 'Email is required';
  readonly valMsgEmailInvalid = 'Email must be a valid email address';
  readonly valMsgPasswordRequired = 'Password is required';
  readonly valMsgPasswordMinLength = 'Password must be at least 5 characters long';

  constructor() {
  }
}
