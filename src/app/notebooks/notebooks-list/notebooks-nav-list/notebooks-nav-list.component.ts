import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Notebook} from '../../store/notebook/notebook.model';

@Component({
  selector: 'app-notebooks-nav-list',
  templateUrl: './notebooks-nav-list.component.html',
  styleUrls: ['./notebooks-nav-list.component.css']
})
export class NotebooksNavListComponent implements OnInit {

  @Input() notebooks$: Observable<Notebook[]>;
  @Input() notebooksConsistency$: Observable<{ [notebookId: string]: boolean }>;

  constructor() {
  }

  ngOnInit() {
  }

}
