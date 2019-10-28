import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {UserAdminResponse} from '../model/user-admin-response.model';
import {AppPropertiesService} from '../../core/services/app-properties.service';
import {MediaObserver} from '@angular/flex-layout';
import {getColumnsConfig, toDisplayedColumns} from '../../core/utils/mat-table.utils';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private users$: Observable<UserAdminResponse[]> = this.http.getAllUsers();

  private displayedColumns: string[] = ['index', 'id', 'mail', 'name', 'created', 'seen', 'roles', 'status'];

  private readonly columnsConfig = getColumnsConfig(this.displayedColumns,
    ['id'],
    ['created', 'seen'],
    ['name']
  );

  mediaSub: Subscription;

  constructor(private http: HttpService,
              private auth: AuthService,
              private appProps: AppPropertiesService,
              private mediaObserver: MediaObserver) {
    this.mediaObserver.filterOverlaps = true;
    this.mediaSub = mediaObserver.asObservable().pipe(
      toDisplayedColumns(this.columnsConfig)
    ).subscribe(displayedColumns => this.displayedColumns = displayedColumns);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
