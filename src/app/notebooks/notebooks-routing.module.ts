import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotebooksContainerComponent} from './container/notebooks-container.component';
import {NotebooksListComponent} from './notebooks-list/notebooks-list.component';
import {NotesListComponent} from './notes-list/notes-list.component';
import {NoteCardComponent} from './notes-list/note-card/note-card.component';

const routes: Routes = [
  {
    path: '', component: NotebooksContainerComponent, children: [
      {path: '', pathMatch: 'full', component: NotebooksListComponent},
      {path: ':id/notes', pathMatch: 'full', component: NotesListComponent},
      {path: ':id/notes/:noteId', pathMatch: 'full', component: NoteCardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebooksRoutingModule {
}
