import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotebooksRoutingModule} from './notebooks-routing.module';
import {NotebooksComponent} from './notebooks.component';
import {NotebooksListComponent} from './notebooks-list/notebooks-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {StoreModule} from '@ngrx/store';
import * as fromNotebook from './store/notebook/notebook.reducer';
import * as fromNote from './store/note/note.reducer';
import {EffectsModule} from '@ngrx/effects';
import {NotebookEffects} from './store/notebook/notebook.effects';
import {ConfirmDialogComponent} from './notebooks-list/confirm-dialog/confirm-dialog.component';
import {NotebookOperationsMenuComponent} from './notebooks-list/notebook-operations-menu/notebook-operations-menu.component';
import {NotebookDialogComponent} from './notebooks-list/notebook-dialog/notebook-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NotesListComponent } from './notes-list/notes-list.component';

@NgModule({
  declarations: [
    NavBarComponent,
    NotebooksComponent,
    NotebooksListComponent,
    NotebookOperationsMenuComponent,
    ConfirmDialogComponent,
    NotebookDialogComponent,
    NotesListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    NotebooksRoutingModule,
    EffectsModule.forFeature([NotebookEffects]),
    StoreModule.forFeature(fromNotebook.notebooksFeatureKey, fromNotebook.reducer),
    StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
  ],
  entryComponents: [ConfirmDialogComponent, NotebookDialogComponent]
})
export class NotebooksModule {
}
