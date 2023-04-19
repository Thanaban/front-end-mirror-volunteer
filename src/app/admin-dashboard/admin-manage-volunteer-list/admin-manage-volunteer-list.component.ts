import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmEditVolunteerListComponent } from './confirm-edit-volunteer-list/confirm-edit-volunteer-list.component';

@Component({
  selector: 'app-admin-manage-volunteer-list',
  templateUrl: './admin-manage-volunteer-list.component.html',
  styleUrls: ['./admin-manage-volunteer-list.component.css'],
})
export class AdminManageVolunteerListComponent implements OnInit {
  constructor(private eventService: EventService,public dialog: MatDialog) {}

  userActivityId: any;
  VolunteerList: any;

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

    this.eventService
      .get_user_in_userAc(this.userActivityId.currentActivityId)
      .subscribe({
        next: (data) => {
          this.VolunteerList = data;
          this.dataSource = new MatTableDataSource(this.VolunteerList);
          console.log('test', this.VolunteerList);
        },
      });
  }

  openDialogEditVolunteerList(userId:number) {
    this.dialog.open(ConfirmEditVolunteerListComponent);
    let data = {userId};
    localStorage.setItem('REMOVEVOLUNTEERLIST',JSON.stringify(data))
  }


  editVolunteerList(userId:number,userActivityId:number){
    

  }
}
