import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 5000, });
  }

  openSnackBarWithCloseAction(message: string): void {
    this.openSnackBar(message, 'Close')
      .onAction().subscribe(() => {
        this.snackBar.dismiss();
      });
  }
}
