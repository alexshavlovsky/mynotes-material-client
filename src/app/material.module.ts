import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule],
})
export class MaterialModule {
}
