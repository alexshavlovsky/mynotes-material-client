import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {ActivatedRoute} from '@angular/router';
import {FetchNotesByNotebookIdRequest, UpdateNoteRequest} from '../../store/note/note.actions';
import {Observable} from 'rxjs';
import {Notebook} from '../../store/notebook/notebook.model';
import {getNotebookById} from '../../store/notebook/notebook.selectors';
import {getNoteByNotebookIdAndNoteId, notesSpinner} from '../../store/note/note.selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter, tap} from 'rxjs/operators';
import {Note} from '../../store/note/note.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  form: FormGroup;
  readonly nbId = this.route.snapshot.paramMap.get('id');
  readonly id = this.route.snapshot.paramMap.get('noteId');
  notebook$: Observable<Notebook> = this.store.select(getNotebookById, {notebookId: this.nbId});
  spinner$: Observable<boolean> = this.store.select(notesSpinner, {notebookId: this.nbId});
  currentNote: Note;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchNotesByNotebookIdRequest({notebookId: this.nbId.toString()}));
    this.store.select(getNoteByNotebookIdAndNoteId, {notebookId: this.nbId, noteId: this.id}).pipe(
      filter(note => note !== null),
      tap((note: Note) => {
        this.form = this.fb.group({
          titleInput: [note.title, []],
          textInput: [note.text, []],
        });
        this.currentNote = note;
      })
    ).subscribe();
  }

  updateNote() {
    this.store.dispatch(new UpdateNoteRequest({
      id: this.currentNote.id.toString(),
      note: {
        title: this.form.value.titleInput,
        text: this.form.value.textInput,
        notebookId: this.currentNote.notebookId
      }
    }));
  }

  notChanged(): boolean {
    return this.currentNote.title === this.form.value.titleInput &&
      this.currentNote.text === this.form.value.textInput;
  }

  goBack() {
    this.location.back();
  }

}
