import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Note} from '../store/note/note.model';
import {Store} from '@ngrx/store';
import {getAllNotes} from '../store/note/note.reducer';
import {ActivatedRoute} from '@angular/router';
import {Notebook} from '../store/notebook/notebook.model';
import {getNotebookById} from '../store/notebook/notebook.reducer';
import {AppState} from '../../store';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes$: Observable<Note[]> = this.store.select(getAllNotes);
  notebook$: Observable<Notebook> = this.store.select(getNotebookById, {id: this.route.snapshot.paramMap.get('id')});

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
