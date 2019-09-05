import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogData} from '../confirm-dialog/confirm-dialog.component';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-notebook-operations-menu',
  templateUrl: './notebook-operations-menu.component.html',
  styleUrls: ['./notebook-operations-menu.component.css']
})
export class NotebookOperationsMenuComponent implements OnInit {
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    const data: ConfirmDialogData = {
      title: 'Are you sure?',
      message: 'Are you sure you want to delete?',
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      map(() => this.remove.emit())
    ).subscribe();
  }

}
