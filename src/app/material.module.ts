import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
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
import {PrefixPipe} from './core/prefix.pipe';
import {FromNowPipe} from './core/from-now.pipe';
import {DateTimeFormatPipe} from './core/date-time-format.pipe';

@NgModule({
  declarations: [
    PrefixPipe,
    FromNowPipe,
    DateTimeFormatPipe
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
  ],
  exports: [
    PrefixPipe,
    FromNowPipe,
    DateTimeFormatPipe,
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
  ],
})
export class MaterialModule {
}
