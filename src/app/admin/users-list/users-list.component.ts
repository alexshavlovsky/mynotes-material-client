import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users$: Observable<UserRegisterResponse[]> = this.http.getAllUsers();
  displayedColumns: string[] = ['index', 'id', 'mail', 'fn', 'ln', 'roles'];

  constructor(private http: HttpService,
              private auth: AuthService) {
  }

  ngOnInit() {
  }

}
