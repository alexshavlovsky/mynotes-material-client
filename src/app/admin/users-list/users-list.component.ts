import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {UserAdminResponse} from '../model/user-admin-response.model';
import {MediaObserver} from '@angular/flex-layout';
import {getColumnsConfig, toDisplayedColumns} from '../../core/utils/mat-table.utils';
import {adaptErrorMessage} from '../../core/services/app-properties.service';
import {SnackBarService} from '../../core/services/snack-bar.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private users: UserAdminResponse[] = null;
  private isFetchUsersFailed = false;
  private fetchErrorMessage = '';

  private displayedColumns: string[] = ['index', 'id', 'mail', 'name', 'created', 'seen', 'roles', 'status', 'menu'];

  private readonly columnsConfig = getColumnsConfig(this.displayedColumns,
    ['id'],
    ['created', 'seen'],
    ['name']
  );

  mediaSub: Subscription;

  constructor(private http: HttpService,
              private snackBar: SnackBarService,
              private auth: AuthService,
              private mediaObserver: MediaObserver) {
    this.mediaObserver.filterOverlaps = true;
    this.mediaSub = mediaObserver.asObservable().pipe(
      toDisplayedColumns(this.columnsConfig)
    ).subscribe(displayedColumns => this.displayedColumns = displayedColumns);
  }

  ngOnInit() {
    this.fetchUsers();
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  fetchUsers() {
    this.http.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.isFetchUsersFailed = false;
      },
      err => {
        this.fetchErrorMessage = adaptErrorMessage(err, 'Failed to fetch users');
        this.snackBar.openError(this.fetchErrorMessage);
        this.users = null;
        this.isFetchUsersFailed = true;
      }
    );
  }

}
