import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminContainerComponent} from './container/admin-container.component';
import {UsersListComponent} from './users-list/users-list.component';
import {NavBarModule} from '../shared/nav-bar/nav-bar.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [
    AdminContainerComponent,
    UsersListComponent
  ],
  imports: [
    NavBarModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
