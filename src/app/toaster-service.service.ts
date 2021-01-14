import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterServiceService {
  constructor(private snackBar: MatSnackBar) {}
  public showToaster(message, action = ''): void {
      this.snackBar.open(message, action, {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
      });
  }
}
