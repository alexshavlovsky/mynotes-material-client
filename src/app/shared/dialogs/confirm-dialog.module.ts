import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule {
}
