import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {UserAdminResponse} from '../model/user-admin-response.model';
import {AppPropertiesService} from '../../core/services/app-properties.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users$: Observable<UserAdminResponse[]> = this.http.getAllUsers();
  private displayedColumns: string[] = ['index', 'id', 'mail', 'name', 'created', 'seen', 'roles', 'status'];

  constructor(private http: HttpService,
              private auth: AuthService,
              private appProps: AppPropertiesService) {
  }

  ngOnInit() {
  }

}
