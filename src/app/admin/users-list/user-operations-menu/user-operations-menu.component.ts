import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserAdminResponse} from '../../model/user-admin-response.model';
import {MatDialog} from '@angular/material';
import {HttpService} from '../../../core/services/http.service';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../shared/dialog/confirm-dialog/confirm-dialog.component';
import {catchError, exhaustMap, filter, map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {adaptErrorMessage} from '../../../core/services/app-properties.service';
import {SnackBarService} from '../../../core/services/snack-bar.service';

@Component({
  selector: 'app-user-operations-menu',
  templateUrl: './user-operations-menu.component.html',
  styleUrls: ['./user-operations-menu.component.css']
})
export class UserOperationsMenuComponent implements OnInit {

  @Input() user: UserAdminResponse;
  @Output() userDeleted = new EventEmitter<void>();

  constructor(private dialog: MatDialog,
              private snackBar: SnackBarService,
              private http: HttpService) {
  }

  ngOnInit() {
  }

  openDeleteDialog() {
    const data: ConfirmDialogData = {
      title: 'Delete account?',
      message: `Account [${this.user.email}] will be deleted`,
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      exhaustMap(() => this.http.deleteUser(this.user.userId)),
      map(() => this.userDeleted.emit()),
      catchError(err => {
        this.snackBar.openError(adaptErrorMessage(err, 'Failed to fetch users'));
        return EMPTY;
      }),
    ).subscribe();
  }

  openEditDialog() {
  }

}
