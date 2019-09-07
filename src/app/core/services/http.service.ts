import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppPropertiesService, pathJoin} from './app-properties.service';
import {UserLoginRequest} from '../../auth/model/user-login-request.model';
import {UserLoginResponse} from '../../auth/model/user-login-response.model';
import {UserRegisterRequest} from '../../auth/model/user-register-request.model';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {Notebook} from '../../notebooks/store/notebook/notebook.model';
import {ApiMessage} from '../model/api-message.model';
import {NotebookRequest} from '../model/notebook-request.model';

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

  private get<T>(url): Observable<T> {
    return this.http.get<T>(url, {headers: this.appProps.API_DEFAULT_HEADERS});
  }

  private delete<T>(url): Observable<T> {
    return this.http.delete<T>(url, {headers: this.appProps.API_DEFAULT_HEADERS});
  }

  private put<T>(url, body): Observable<T> {
    return this.http.put<T>(url, body, {headers: this.appProps.API_DEFAULT_HEADERS});
  }

  postLoginRequest(body: UserLoginRequest): Observable<UserLoginResponse> {
    return this.post<UserLoginResponse>(this.appProps.API_LOGIN_PATH, body);
  }

  postRegisterRequest(body: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.post<UserRegisterResponse>(this.appProps.API_USERS_PATH, body);
  }

  getCurrentUserRequest(): Observable<UserRegisterResponse> {
    return this.get<UserRegisterResponse>(this.appProps.API_CURRENT_USER_PATH);
  }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.get<Notebook[]>(this.appProps.API_NOTEBOOKS_PATH);
  }

  deleteNotebook(id: string): Observable<ApiMessage> {
    const path = pathJoin([this.appProps.API_NOTEBOOKS_PATH, String(id)]);
    return this.delete<ApiMessage>(path);
  }

  renameNotebook(id: string, body: NotebookRequest): Observable<Notebook> {
    const path = pathJoin([this.appProps.API_NOTEBOOKS_PATH, String(id)]);
    return this.put<Notebook>(path, body);
  }

}
