import {UserRegisterResponse} from '../../auth/model/user-register-response.model';

export interface UserAdminResponse extends UserRegisterResponse {
  createdOn: Date;
  enabled: boolean;
}
