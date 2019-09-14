import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Note} from '../store/note/note.model';
import {Store} from '@ngrx/store';
import {getNotesByNotebookId, notesSpinner} from '../store/note/note.reducer';
import {ActivatedRoute} from '@angular/router';
import {Notebook} from '../store/notebook/notebook.model';
import {getNotebookById} from '../store/notebook/notebook.reducer';
import {AppState} from '../../store';
import {FetchNotesByNotebookIdRequest} from '../store/note/note.actions';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  readonly nbId = this.route.snapshot.paramMap.get('id');
  notebook$: Observable<Notebook> = this.store.select(getNotebookById, {id: this.nbId});
  notes$: Observable<Note[]> = this.store.select(getNotesByNotebookId, {notebookId: this.nbId});
  spinner$: Observable<boolean> = this.store.select(notesSpinner, {notebookId: this.nbId});

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchNotesByNotebookIdRequest({notebookId: this.nbId.toString()}));
  }

}
