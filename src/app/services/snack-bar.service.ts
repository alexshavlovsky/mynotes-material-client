import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AppPropertiesService} from "./app-properties.service";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private appProps: AppPropertiesService,
    private snackbar: MatSnackBar) {
  }

  openSuccess(message: string) {
    this.snackbar.open(message, this.appProps.snackbarDefaultAction,
      {duration: this.appProps.snackbarDefaultDelay, panelClass: ['success-snackbar']});
  }

  openError(message: string) {
    this.snackbar.open(message, this.appProps.snackbarDefaultAction,
      {duration: this.appProps.snackbarDefaultDelay, panelClass: ['error-snackbar']});
  }

}
