import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotebooksComponent} from './notebooks.component';
import {NotebooksListComponent} from './notebooks-list/notebooks-list.component';

const routes: Routes = [
  {
    path: '', component: NotebooksComponent, children: [
      {path: '', pathMatch: 'full', component: NotebooksListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebooksRoutingModule {
}
