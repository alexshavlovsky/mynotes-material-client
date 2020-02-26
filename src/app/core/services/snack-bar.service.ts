import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AppPropertiesService} from './app-properties.service';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private appProps: AppPropertiesService,
    private snackbar: MatSnackBar) {
  }

  openSuccess(message: string) {
    this.snackbar.open(message, this.appProps.SNACK_BAR_DEF_ACTION,
      {duration: this.appProps.SNACK_BAR_DEF_DELAY, panelClass: ['success-snackbar']});
  }

  openError(message: string) {
    this.snackbar.open(message, this.appProps.SNACK_BAR_DEF_ACTION,
      {duration: this.appProps.SNACK_BAR_DEF_DELAY, panelClass: ['error-snackbar']});
  }

}
