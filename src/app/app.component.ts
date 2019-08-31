import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {appRoutingAnimation} from './app-routing.animation';

@Component({
  selector: 'app-root',
  animations: [appRoutingAnimation],
  template: `
    <div [@appRoutingAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
})
export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
