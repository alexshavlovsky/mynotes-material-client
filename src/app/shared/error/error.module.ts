import {NgModule} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {CommonModule} from '@angular/common';
import {ErrorContainerComponent} from './container/error-container.component';
import {NavBarModule} from '../nav-bar/nav-bar.module';
import {ErrorMessageComponent} from './error-message/error-message.component';

@NgModule({
  declarations: [
    ErrorContainerComponent,
    ErrorMessageComponent,
  ],
  imports: [
    NavBarModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ErrorContainerComponent,
    ErrorMessageComponent,
  ]
})
export class ErrorModule {
}
