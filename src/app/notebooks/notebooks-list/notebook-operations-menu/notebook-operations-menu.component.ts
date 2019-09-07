import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogData} from '../confirm-dialog/confirm-dialog.component';
import {filter, map} from 'rxjs/operators';
import {RenameDialogComponent, RenameDialogData} from '../rename-dialog/rename-dialog.component';
import {Notebook} from '../../store/notebook/notebook.model';

export interface NotebookOperationsMenuRenamePayload {
  name: string;
}

@Component({
  selector: 'app-notebook-operations-menu',
  templateUrl: './notebook-operations-menu.component.html',
  styleUrls: ['./notebook-operations-menu.component.css']
})
export class NotebookOperationsMenuComponent implements OnInit {
  @Input() notebook: Notebook;
  @Output() add = new EventEmitter<void>();
  @Output() rename = new EventEmitter<NotebookOperationsMenuRenamePayload>();
  @Output() remove = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDeleteDialog() {
    const data: ConfirmDialogData = {
      title: 'Delete notebook?',
      message: 'The notebook with all contained notes will be deleted',
      cancelButton: 'Cancel',
      confirmButton: 'Delete',
    };
    this.dialog.open(ConfirmDialogComponent, {data, autoFocus: false}).afterClosed().pipe(
      filter(result => result === true),
      map(() => this.remove.emit())
    ).subscribe();
  }

  openEditDialog() {
    const data: RenameDialogData = {
      title: 'Rename notebook',
      placeholder: 'New name',
      initialValue: this.notebook.name,
      cancelButton: 'Cancel',
      confirmButton: 'Rename',
    };
    this.dialog.open(RenameDialogComponent, {data}).afterClosed().pipe(
      filter(value => value !== undefined && value !== this.notebook.name),
      map(value => this.rename.emit({name: value}))
    ).subscribe();
  }
}
