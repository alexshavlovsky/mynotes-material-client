import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface JwtTokenDetails {
  userId: string;
  exp: Date;
  roles: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwt = new JwtHelperService();

  constructor() {
  }

  getDecodedToken(raw: string): JwtTokenDetails {
    const decoded = this.jwt.decodeToken(raw);
    const exp = this.jwt.getTokenExpirationDate(raw);
    return {userId: decoded.sub, exp, roles: decoded.roles};
  }

}
