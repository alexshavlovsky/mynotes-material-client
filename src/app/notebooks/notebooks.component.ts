import {Component, OnInit} from '@angular/core';
import {AppState} from '../store';
import {Store} from '@ngrx/store';
import {FetchAllNotebooksRequest} from './store/notebook/notebook.actions';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.css'],
})
export class NotebooksComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchAllNotebooksRequest());
  }

}
