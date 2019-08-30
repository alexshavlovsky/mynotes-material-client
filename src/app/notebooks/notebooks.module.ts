import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotebooksRoutingModule} from './notebooks-routing.module';
import {NotebooksComponent} from './notebooks.component';

@NgModule({
  declarations: [NotebooksComponent],
  imports: [
    CommonModule,
    NotebooksRoutingModule
  ]
})
export class NotebooksModule {
}
