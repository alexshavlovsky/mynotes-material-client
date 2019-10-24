import {NgModule} from '@angular/core';
import {NavBarComponent} from './nav-bar.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {MaterialModule} from '../../material.module';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    NavBarComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    NavBarComponent,
    UserMenuComponent,
  ]
})
export class NavBarModule {
}
