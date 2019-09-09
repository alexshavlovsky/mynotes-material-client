import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotebooksComponent} from './notebooks.component';
import {NotebooksListComponent} from './notebooks-list/notebooks-list.component';
import {NotesListComponent} from './notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '', component: NotebooksComponent, children: [
      {path: '', pathMatch: 'full', component: NotebooksListComponent},
      {path: ':id/notes', pathMatch: 'full', component: NotesListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebooksRoutingModule {
}
