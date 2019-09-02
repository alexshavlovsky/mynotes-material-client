import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() appName: string;
  @Input() user$: Observable<UserRegisterResponse>;
  @Output() logout = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
