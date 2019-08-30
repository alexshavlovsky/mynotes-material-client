import {UserRegisterResponse} from './user-register-response.model';

export interface UserLoginResponse {
  token: string;
  user: UserRegisterResponse;
}
