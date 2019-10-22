import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/services/http.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() appName: string;
  @Input() user$: Observable<UserRegisterResponse>;
  @Output() logout = new EventEmitter<void>();

  constructor(private http: HttpService) {
  }

  ngOnInit() {
  }

  exportAsExcel() {
    this.http.getAllNotesAsExcel().pipe(
      map(response => this.http.redirectBlobToBrowser(response))
    ).subscribe();
  }

}
