import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent
} from "../../components/confirmation-dialog-component/confirmation-dialog-component.component";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(data: ConfirmationDialogData): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data,
    });

    return dialogRef.afterClosed().toPromise();
  }
}
