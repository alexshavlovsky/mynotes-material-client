import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
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
import {UserAdminResponse} from '../../admin/model/user-admin-response.model';
import {UserAdminRequest} from '../../admin/model/user-admin-request.model';

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

  getAllUsers(): Observable<UserAdminResponse[]> {
    return this.get<UserAdminResponse[]>(this.appProps.API_USERS_PATH);
  }

  deleteUser(id: string): Observable<ApiMessage> {
    const path = pathJoin([this.appProps.API_USERS_PATH, String(id)]);
    return this.delete<ApiMessage>(path);
  }

  updateUser(id: string, body: UserAdminRequest): Observable<UserAdminResponse> {
    const path = pathJoin([this.appProps.API_USERS_PATH, String(id)]);
    return this.put<UserAdminResponse>(path, body);
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

  getAllNotesAsExcel(): Observable<HttpResponse<Blob>> {
    return this.http.get(this.appProps.API_NOTES_XLS_PATH, {
      headers: this.appProps.API_EXCEL_HEADERS, observe: 'response', responseType: 'blob'
    });
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

  // BLOB UTILS

  redirectBlobToBrowser(response: HttpResponse<Blob>) {
    this.downloadFile(response.body, this.parseFilename(response.headers));
  }

  private parseFilename(headers: HttpHeaders): string {
    const header = headers.get('content-disposition');
    const exp = /filename[^;=]*=((['"]).*?\2|[^;]*)/g;
    return exp.exec(header)[1];
  }

  private downloadFile(blob: Blob, filename: string) {
    // see also https://gist.github.com/dreamyguy/6b4ab77d2f118adb8a63c4a03fba349d
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));
    URL.revokeObjectURL(url);
  }

}
