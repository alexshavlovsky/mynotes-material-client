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
import {UserDialogComponent} from './users-list/user-dialog/user-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogModule} from '../shared/dialogs/confirm-dialog.module';

@NgModule({
  declarations: [
    AdminContainerComponent,
    UsersListComponent,
    UserOperationsMenuComponent,
    UserDialogComponent,
  ],
  imports: [
    ConfirmDialogModule,
    ReactiveFormsModule,
    ErrorModule,
    NavBarModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule,
  ],
  entryComponents: [UserDialogComponent]
})
export class AdminModule {
}
