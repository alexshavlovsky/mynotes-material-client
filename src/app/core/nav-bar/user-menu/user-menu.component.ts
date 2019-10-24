import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRegisterResponse} from '../../../auth/model/user-register-response.model';
import {JwtTokenDetails} from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  @Input() user: UserRegisterResponse;
  @Input() token: JwtTokenDetails;
  @Output() export = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
