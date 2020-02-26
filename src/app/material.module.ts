import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatRadioModule,
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
    MatRadioModule,
  ],
})
export class MaterialModule {
}
