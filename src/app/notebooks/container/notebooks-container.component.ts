import {Component, OnInit} from '@angular/core';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {FetchAllNotebooksRequest} from '../store/notebook/notebook.actions';

@Component({
  selector: 'app-notebooks-container',
  templateUrl: './notebooks-container.component.html',
  styleUrls: ['./notebooks-container.component.css', '../../shared/root.container.css'],
})
export class NotebooksContainerComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchAllNotebooksRequest());
  }

}
