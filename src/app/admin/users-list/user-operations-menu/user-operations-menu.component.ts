import {Component, Input, OnInit} from '@angular/core';
import {UserAdminResponse} from '../../model/user-admin-response.model';
import {MatDialog} from '@angular/material';
import {HttpService} from '../../../core/services/http.service';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../shared/dialog/confirm-dialog/confirm-dialog.component';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-operations-menu',
  templateUrl: './user-operations-menu.component.html',
  styleUrls: ['./user-operations-menu.component.css']
})
export class UserOperationsMenuComponent implements OnInit {

  @Input() user: UserAdminResponse;

  constructor(private dialog: MatDialog,
              private http: HttpService) {
  }

  ngOnInit() {
  }

  openDeleteDialog() {
    const data: ConfirmDialogData = {
      title: 'Delete user?',
      message: `User [${this.user.email}] will be deleted`,
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      tap(() => this.http.deleteUser(this.user.userId).subscribe(
        (x) => console.log(x)
      ))
    ).subscribe();
  }

  openEditDialog() {
  }

}
