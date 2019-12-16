import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {EMPTY, Observable} from 'rxjs';
import {HttpService} from '../../core/services/http.service';
import {catchError, filter, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {AppPropertiesService} from '../../core/services/app-properties.service';
import {isAdmin, isUser, tokenDecoded, userDetails} from '../../store/principal/principal.selectors';
import {Logout} from '../../store/principal/principal.actions';
import {JwtTokenDetails} from '../../core/services/auth.service';
import {SnackBarService} from '../../core/services/snack-bar.service';
import {DOCUMENT} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogData} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {FeedbackDialogComponent} from './feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  @HostBinding('class') classes = 'mat-elevation-z4';

  user$: Observable<UserRegisterResponse> = this.store.select(userDetails);
  token$: Observable<JwtTokenDetails> = this.store.select(tokenDecoded);
  isAdmin$: Observable<boolean> = this.store.select(isAdmin);
  isUser$: Observable<boolean> = this.store.select(isUser);
  switchFrontendLink = this.appProps.switchFrontendHref === '' ? null : this.document.location.origin + this.appProps.switchFrontendHref;

  constructor(private http: HttpService,
              private store: Store<AppState>,
              private appProps: AppPropertiesService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
  }

  exportAsExcel() {
    this.http.getAllNotesAsExcel().pipe(
      map(response => this.http.redirectBlobToBrowser(response)),
      catchError(() => {
        // see also https://github.com/angular/angular/issues/19888
        this.snackBar.openError('Failed to get an Excel file');
        return EMPTY;
      })
    ).subscribe();
  }

  leaveFeedback(user: UserRegisterResponse) {
    this.dialog.open(FeedbackDialogComponent, {data: {user}}).afterClosed().subscribe();
  }

  onLogout() {
    const data: ConfirmDialogData = {
      title: 'Sign out confirmation',
      message: `Are you sure you want to sign out?`,
      cancelButton: 'Cancel',
      confirmButton: 'Sign out',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      map(() => this.store.dispatch(new Logout()))
    ).subscribe();
  }

}
