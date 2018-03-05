import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-delete-component',
  templateUrl: 'dialog-delete.component.html',
})

export class DialogDeleteComponent {
  pocoId: any;
  pocoName: string;

  constructor( public dialogRef: MatDialogRef<DialogDeleteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.pocoId = data.id;
    this.pocoName = data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
