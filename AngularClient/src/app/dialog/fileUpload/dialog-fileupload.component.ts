import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-fileupload-component',
  templateUrl: 'dialog-fileupload.component.html',
  styleUrls: ['./dialog-fileupload.component.css']
})

export class DialogFileUploadComponent {
  fileList: FileList = null;

  id: any;
  title: string;

  constructor( public dialogRef: MatDialogRef<DialogFileUploadComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id;
    this.title = data.name;
  }

  get isUploadActive(): boolean{
    return this.fileList !== null;
  }

  onFileSelected(event){
    this.fileList = event.target.files;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
