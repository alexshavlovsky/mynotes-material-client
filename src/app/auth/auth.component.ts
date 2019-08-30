import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {authRoutingAnimation} from './auth-routing.animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [authRoutingAnimation]
})
export class AuthComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
