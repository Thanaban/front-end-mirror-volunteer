import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmEditVolunteerListComponent } from './confirm-edit-volunteer-list/confirm-edit-volunteer-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from 'src/app/snack-bar-message/snack-bar-message.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manage-volunteer-list',
  templateUrl: './admin-manage-volunteer-list.component.html',
  styleUrls: ['./admin-manage-volunteer-list.component.css'],
})
export class AdminManageVolunteerListComponent implements OnInit {
  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminManageVolunteerListComponent>,
    private _snackBar: MatSnackBar
  ) {}

  durationInSeconds = 5;
  userActivityId: any;
  VolunteerList: any;
  settext: string = '';

  displayedColumns: string[] = [
    'name',
    'gender',
    'birthday',
    'religion',
    'phoneNumber',
    'career',
    'congenitalDisease',
    'allergicFood',
  ];

  dataSource = new MatTableDataSource<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    let data: any = localStorage.getItem('ADMINEVENT');
    this.userActivityId = JSON.parse(data);
    console.log(this.userActivityId);
    this.get_data();
  }

  get_data() {
    this.eventService
      .get_user_in_userAc(this.userActivityId.currentActivityId)
      .subscribe({
        next: (data) => {
          this.VolunteerList = data;
          this.dataSource.data = this.VolunteerList; 
          console.log('test', this.VolunteerList);
        },
      });
  }

  openDialogEditVolunteerList(userId: number, name: string, lastname: string) {
    Swal.fire({
      title: 'โปรดยืนยัน?',
      html: '<b>นำอาสา ' + name + ' ' + lastname + ' ออกจากรายชื่อ<b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#27a644',
      cancelButtonColor: '#ff2626',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService
          .remove_user_from_useractivity(
            userId,
            this.userActivityId.currentActivityId
          )
          .subscribe({
            next: (data) => {
              this.get_data();
              console.log('test', data);
            },
          });
      }
    });
  }

  finish_activity() {
    Swal.fire({
      title: 'โปรดยืนยัน?',
      html: '<b>ต้องการเสร็จสิ้นกิจกรรม<b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#27a644',
      cancelButtonColor: '#ff2626',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService
          .finish_activity(this.userActivityId.currentActivityId)
          .subscribe({
            next: (data) => {
              console.warn(data);
              this.get_data(); // Update the data
              this.dialogRef.close(); // Close the dialog
            },
          });
      }
    });
  }
}
