import {NgModule} from '@angular/core';
import {NavBarComponent} from './nav-bar.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {MaterialModule} from '../../material.module';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ConfirmDialogModule} from '../dialogs/confirm-dialog.module';
import {FeedbackDialogComponent} from './feedback-dialog/feedback-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavBarComponent,
    UserMenuComponent,
    FeedbackDialogComponent
  ],
  imports: [
    ConfirmDialogModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [FeedbackDialogComponent],
  exports: [
    NavBarComponent,
    UserMenuComponent,
  ]
})
export class NavBarModule {
}
