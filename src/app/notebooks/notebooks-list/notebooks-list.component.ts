import {Component, HostBinding, OnInit} from '@angular/core';
import {notebooksListAnimations} from './notebooks-list.animations';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css'],
  animations: [notebooksListAnimations]
})
export class NotebooksListComponent implements OnInit {
  @HostBinding('@notebooksListAnimations') animation = true;

  constructor() {
  }

  ngOnInit() {
  }

}
