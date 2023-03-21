import { Component,TemplateRef,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent {
  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;
  myFooList = ['Some Item', 'Item Second', 'Other In Row', 'What to write', 'Blah To Do']
  constructor(public dialog: MatDialog) { }
  openTempDialog() {
    const myCompDialog = this.dialog.open(this.dialogRef, { data: this.myFooList,panelClass: 'fullscreen-dialog',
    height: '100vh',
    width: '100%' });
    myCompDialog.afterOpened().subscribe((res) => {
      // Trigger After Dialog Opened
      console.log('After Opened', { res });
    });
    myCompDialog.beforeClosed().subscribe((res) => {
      // Trigger Before Dialog Closed
      console.log('Before Closed', { res });
    });
    myCompDialog.afterClosed().subscribe((res) => {
      // Trigger After Dialog Closed
      console.log('After Closed', { res });
    });
  }
}
