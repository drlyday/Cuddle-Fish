import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-yesNo-component',
  templateUrl: 'dialog-yesNo.component.html'
})

export class DialogYesNoComponent {
  id: any;
  title: string;
  question: string;

  constructor( public dialogRef: MatDialogRef<DialogYesNoComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.title = data.name;
    this.question = data.question;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
