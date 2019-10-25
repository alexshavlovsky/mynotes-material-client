import {Component, HostBinding, OnInit} from '@angular/core';
import {UserRegisterResponse} from '../../auth/model/user-register-response.model';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/services/http.service';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {AppPropertiesService} from '../../core/services/app-properties.service';
import {tokenDecoded, userDetails} from '../../store/principal/principal.selectors';
import {Logout} from '../../store/principal/principal.actions';
import {JwtTokenDetails} from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  @HostBinding('class') classes = 'mat-elevation-z4';

  private user$: Observable<UserRegisterResponse> = this.store.select(userDetails);
  private token$: Observable<JwtTokenDetails> = this.store.select(tokenDecoded);

  constructor(private http: HttpService,
              private store: Store<AppState>,
              private appProps: AppPropertiesService) {
  }

  ngOnInit() {
  }

  exportAsExcel() {
    this.http.getAllNotesAsExcel().pipe(
      map(response => this.http.redirectBlobToBrowser(response))
    ).subscribe();
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
