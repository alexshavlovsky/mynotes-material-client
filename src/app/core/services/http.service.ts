import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppPropertiesService, pathJoin} from './app-properties.service';
import {UserLoginRequest} from '../../auth/model/user-login-request.model';
import {UserLoginResponse} from '../../auth/model/user-login-response.model';
import {UserRegisterRequest} from '../../auth/model/user-register-request.model';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {ApiMessage} from '../model/api-message.model';
import {NotebookRequest} from '../model/notebook-request.model';
import {NotebookResponse} from '../model/notebook-response.model';
import {NoteResponse} from '../model/note-response.model';
import {NoteRequest} from '../model/note-request.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private appProps: AppPropertiesService) {
  }

  // HTTP CLIENT WRAPPERS

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

  // USERS ENDPOINT

  getCurrentUserRequest(): Observable<UserRegisterResponse> {
    return this.get<UserRegisterResponse>(this.appProps.API_CURRENT_USER_PATH);
  }

  postLoginRequest(body: UserLoginRequest): Observable<UserLoginResponse> {
    return this.post<UserLoginResponse>(this.appProps.API_LOGIN_PATH, body);
  }

  postRegisterRequest(body: UserRegisterRequest): Observable<UserRegisterResponse> {
    return this.post<UserRegisterResponse>(this.appProps.API_USERS_PATH, body);
  }

  // NOTEBOOKS ENDPOINT

  getAllNotebooks(): Observable<NotebookResponse[]> {
    return this.get<NotebookResponse[]>(this.appProps.API_NOTEBOOKS_PATH);
  }

  createNotebook(body: NotebookRequest): Observable<NotebookResponse> {
    return this.post<NotebookResponse>(this.appProps.API_NOTEBOOKS_PATH, body);
  }

  updateNotebook(id: string, body: NotebookRequest): Observable<NotebookResponse> {
    const path = pathJoin([this.appProps.API_NOTEBOOKS_PATH, String(id)]);
    return this.put<NotebookResponse>(path, body);
  }

  deleteNotebook(id: string): Observable<ApiMessage> {
    const path = pathJoin([this.appProps.API_NOTEBOOKS_PATH, String(id)]);
    return this.delete<ApiMessage>(path);
  }

  // NOTES ENDPOINT

  getAllNotes(): Observable<NoteResponse[]> {
    return this.get<NoteResponse[]>(this.appProps.API_NOTES_PATH);
  }

  getNotesByNotebookId(id: string): Observable<NoteResponse[]> {
    return this.get<NoteResponse[]>(pathJoin([this.appProps.API_NOTEBOOKS_PATH, id, this.appProps.API_NOTES]));
  }

  createNote(body: NoteRequest): Observable<NoteResponse> {
    return this.post<NoteResponse>(this.appProps.API_NOTES_PATH, body);
  }

  updateNote(id: string, body: NoteRequest): Observable<NoteResponse> {
    const path = pathJoin([this.appProps.API_NOTES_PATH, String(id)]);
    return this.put<NoteResponse>(path, body);
  }

  deleteNote(id: string): Observable<ApiMessage> {
    const path = pathJoin([this.appProps.API_NOTES_PATH, String(id)]);
    return this.delete<ApiMessage>(path);
  }

}
