import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotebooksRoutingModule} from './notebooks-routing.module';
import {NotebooksComponent} from './notebooks.component';
import {NotebooksListComponent} from './notebooks-list/notebooks-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [NotebooksComponent, NotebooksListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NotebooksRoutingModule
  ]
})
export class NotebooksModule {
}
