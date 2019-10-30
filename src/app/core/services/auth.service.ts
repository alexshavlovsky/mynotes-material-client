import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RouteUrls} from '../../app-routing.config';

export interface JwtTokenDetails {
  userId: string;
  exp: Date;
  roles: number;
  rolesString: string;
  hasRoleAdmin: boolean;
  hasRoleUser: boolean;
  defaultRoute: string;
}

enum AuthRole {
  ADMIN = 1, // first bit
  USER = 2   // second bit
}

const DEFAULT_ROUTE_BY_ROLE = [
  // if user has multiple roles, default route will be selected
  // with priority according to the first match in this list
  {role: AuthRole.ADMIN, url: RouteUrls.ADMIN_CONTAINER},
  {role: AuthRole.USER, url: RouteUrls.USER_CONTAINER}
];

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

  private static getDefaultRoute(roles: number) {
    const route = DEFAULT_ROUTE_BY_ROLE.find(r => AuthService.hasRole(r.role, roles));
    return (route === undefined ? RouteUrls.ERROR : route.url);
  }

  rolesToString(mask: number): string {
    /* tslint:disable:no-bitwise */
    return Object.keys(AuthRole).filter((key) => ((AuthRole[key] & mask) !== 0)).join(', ').toLowerCase();
    /* tslint:enable:no-bitwise */
  }

  hasRoleAdmin(mask: number): boolean {
    return AuthService.hasRole(AuthRole.ADMIN, mask);
  }

  hasRoleUser(mask: number): boolean {
    return AuthService.hasRole(AuthRole.USER, mask);
  }

  packRoles(admin: boolean, user: boolean): number {
    let res = 0;
    res += admin ? AuthRole.ADMIN : 0;
    res += user ? AuthRole.USER : 0;
    return res;
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
      rolesString: this.rolesToString(roles),
      hasRoleAdmin: this.hasRoleAdmin(roles),
      hasRoleUser: this.hasRoleUser(roles),
      defaultRoute: AuthService.getDefaultRoute(roles)
    };
  }

}
