import {Component, Input, OnInit} from '@angular/core';
import {UserAdminResponse} from '../../model/user-admin-response.model';
import {MatDialog} from '@angular/material';
import {HttpService} from '../../../core/services/http.service';

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
  }

  openEditDialog() {
  }
}
