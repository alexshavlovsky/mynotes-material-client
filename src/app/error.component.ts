import {Component} from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <app-nav-bar></app-nav-bar>
    <div style="position:absolute;top:90px;width:100%;text-align:center;">
      <mat-icon style="font-size:64px;width:64px;height:64px;" color="warn">warning</mat-icon>
      <h4>Routing error: path not found</h4>
    </div>`
})
export class ErrorComponent {
}
