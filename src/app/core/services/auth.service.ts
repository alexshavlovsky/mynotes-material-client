import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface JwtTokenDetails {
  userId: string;
  exp: Date;
  roles: number;
  rolesString: string;
  hasAdminRole: boolean;
  hasUserRole: boolean;
}

enum AuthRole {
  ADMIN = 1, // first bit
  USER = 2   // second bit
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt = new JwtHelperService();

  constructor() {
  }

  private static hasRole(role: AuthRole, roles: number): boolean {
    /* tslint:disable:no-bitwise */
    return (role & roles) !== 0;
    /* tslint:enable:no-bitwise */
  }

  private static rolesToString(mask: number): string {
    /* tslint:disable:no-bitwise */
    return Object.keys(AuthRole).filter((key) => ((AuthRole[key] & mask) !== 0)).join(', ').toLowerCase();
    /* tslint:enable:no-bitwise */
  }

  isTokenValid(raw: string): boolean {
    return !this.jwt.isTokenExpired(raw);
  }

  getDecodedToken(raw: string): JwtTokenDetails {
    const decoded = this.jwt.decodeToken(raw);
    const exp = this.jwt.getTokenExpirationDate(raw);
    const roles = decoded.roles;
    return {
      userId: decoded.sub,
      exp,
      roles,
      rolesString: AuthService.rolesToString(roles),
      hasAdminRole: AuthService.hasRole(AuthRole.ADMIN, roles),
      hasUserRole: AuthService.hasRole(AuthRole.USER, roles),
    };
  }

}
