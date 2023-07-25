import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AttentionDialogComponent} from "../../components/attention-dialog/attention-dialog.component";

interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AttentionDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(data: ConfirmationDialogData): Promise<boolean> {
    const dialogRef = this.dialog.open(AttentionDialogComponent, {
      width: '300px',
      data,
    });

    return dialogRef.afterClosed().toPromise();
  }
}
