import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminContainerComponent} from './container/admin-container.component';
import {UsersListComponent} from './users-list/users-list.component';
import {NavBarModule} from '../shared/nav-bar/nav-bar.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {AdminRoutingModule} from './admin-routing.module';
import {UserOperationsMenuComponent} from './users-list/user-operations-menu/user-operations-menu.component';
import {ErrorModule} from '../shared/error/error.module';
import {DialogModule} from '../shared/dialog/dialog.module';
import {ConfirmDialogComponent} from '../shared/dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AdminContainerComponent,
    UsersListComponent,
    UserOperationsMenuComponent,
  ],
  imports: [
    DialogModule,
    ErrorModule,
    NavBarModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class AdminModule {
}
