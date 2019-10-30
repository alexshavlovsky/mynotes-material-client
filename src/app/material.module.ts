import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {NgModule} from '@angular/core';
import {PrefixPipe} from './core/pipes/prefix.pipe';
import {FromNowPipe} from './core/pipes/from-now.pipe';
import {DateTimeFormatPipe} from './core/pipes/date-time-format.pipe';
import {AppPropPipe} from './core/pipes/app-prop.pipe';


@NgModule({
  declarations: [
    PrefixPipe,
    FromNowPipe,
    DateTimeFormatPipe,
    AppPropPipe
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [
    PrefixPipe,
    FromNowPipe,
    DateTimeFormatPipe,
    AppPropPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule {
}
