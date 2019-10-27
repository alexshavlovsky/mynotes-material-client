import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRegisterResponse} from '../../../auth/model/user-register-response.model';
import {JwtTokenDetails} from '../../../core/services/auth.service';
import {AppPropertiesService} from '../../../core/services/app-properties.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  @Input() user: UserRegisterResponse;
  @Input() token: JwtTokenDetails;
  @Output() export = new EventEmitter<void>();

  constructor(private appProps: AppPropertiesService) {
  }

  ngOnInit() {
  }

}
