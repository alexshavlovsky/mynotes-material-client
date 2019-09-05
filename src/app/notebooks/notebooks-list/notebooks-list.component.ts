import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Notebook} from '../store/notebook/notebook.model';
import {getAllNotebooks, NotebooksState} from '../store/notebook/notebook.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
})
export class NotebooksListComponent implements OnInit {

  notebooks$: Observable<Notebook[]> = this.store.select(getAllNotebooks);

  constructor(private store: Store<NotebooksState>) {
  }

  ngOnInit() {
  }

}
