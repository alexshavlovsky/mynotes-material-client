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
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {NgModule} from '@angular/core';
import {PrefixPipe} from './core/prefix.pipe';

@NgModule({
  declarations: [
    PrefixPipe
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
  ],
  exports: [
    PrefixPipe,
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
  ],
})
export class MaterialModule {
}
