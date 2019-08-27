import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppPropertiesService} from "./app-properties.service";
import {UserLoginRequest} from "../auth/model/user-login-request.model";
import {UserLoginResponse} from "../auth/model/user-login-response.model";
import {UserRegisterRequest} from "../auth/model/user-register-request.model";
import {UserRegisterResponse} from "../auth/model/user-register-response.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private appProps: AppPropertiesService) {
  }

  private post<T>(url, body): Observable<T> {
    return this.http.post<T>(url, body, {headers: this.appProps.API_DEFAULT_HEADERS});
  }

  postLoginRequest(body: UserLoginRequest): Observable<UserLoginResponse> {
    return this.post<UserLoginResponse>(this.appProps.API_LOGIN_PATH, body);
  }

  postRegisterRequest(body: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.post<UserRegisterResponse>(this.appProps.API_USERS_PATH, body);
  }

}
