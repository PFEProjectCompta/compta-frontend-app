import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-attention-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close(true)">OK</button>
    </div>
  `,
})
export class AttentionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AttentionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}
}
