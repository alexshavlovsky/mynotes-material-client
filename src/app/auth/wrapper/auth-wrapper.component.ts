import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {authWrapperAnimation} from "./auth-wrapper.animation";

@Component({
  selector: 'auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  animations: [authWrapperAnimation]
})
export class AuthWrapperComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
