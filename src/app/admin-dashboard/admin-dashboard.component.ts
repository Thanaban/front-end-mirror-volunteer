import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminVolunteerListComponent } from './admin-volunteer-list/admin-volunteer-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { AdminManageVolunteerListComponent } from './admin-manage-volunteer-list/admin-manage-volunteer-list.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  eventWaitToStartActivity: any;
  eventOnGoingActivity: any;
  eventEndActivity: any;
  dateForm: any;
  month: any;
  afterMonth: string = '';
  userActivityWaitToStart = [] as any;
  userActivityOnGoing = [] as any;
  userActivityEnd = [] as any;

  displayedColumns: string[] = ['date', 'gender', 'birthday', 'volunteer'];
  dataSourceWaitToStartActivity = new MatTableDataSource<any>();
  dataSourceOnGoingActivity = new MatTableDataSource<any>();
  dataSourceEndActivity = new MatTableDataSource<any>();

  applyFilterWaitToStartActivity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceWaitToStartActivity.filter = filterValue
      .trim()
      .toLowerCase();
  }

  applyFilterOnGoingActivity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOnGoingActivity.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDataWaitToStartActivity();
    this.getDataOnGoingActivity();
  }

  getDataWaitToStartActivity() {
    this.http
      .get('https://api.volunteerm.online/activities/wait_to_start')
      .subscribe((response) => {
        this.eventWaitToStartActivity = response;

        for (let i = 0; i < this.eventWaitToStartActivity.length; i++) {
          if (this.eventWaitToStartActivity[i].userId.length > 0) {
            this.eventWaitToStartActivity[i].date = this.con_date(
              this.eventWaitToStartActivity[i].date
            );
            this.userActivityWaitToStart.push(this.eventWaitToStartActivity[i]);
          }
        }
        this.dataSourceWaitToStartActivity = new MatTableDataSource(
          this.userActivityWaitToStart
        );
      });
  }

  getDataOnGoingActivity() {
    this.http
      .get('https://api.volunteerm.online/activities/ongoing_activity')
      .subscribe((response2) => {
        this.eventOnGoingActivity = response2;
        for (let i = 0; i < this.eventOnGoingActivity.length; i++) {
          this.eventOnGoingActivity[i].date = this.con_date(
            this.eventOnGoingActivity[i].date
          );
          this.userActivityOnGoing.push(this.eventOnGoingActivity[i]);
        }
        this.dataSourceOnGoingActivity = new MatTableDataSource(
          this.userActivityOnGoing
        );
      });
  }

  getDataEndActivity() {
    this.http
      .get('https://api.volunteerm.online/activities/ended_activity')
      .subscribe((response3) => {
        this.eventEndActivity = response3;
        for (let i = 0; i < this.eventEndActivity.length; i++) {
          this.eventEndActivity[i].date = this.con_date(
            this.eventEndActivity[i].date
          );
          this.userActivityEnd.push(this.eventEndActivity[i]);
        }
        this.dataSourceEndActivity = new MatTableDataSource(
          this.userActivityEnd
        );
      });
  }


  con_date(d: any) {
    d = d.split('-');
    this.month = d[1];
    if (d[1] == '04') {
      d[1] = 'เมษายน';
    } else if (d[1] == '05') {
      d[1] = 'พฤษภาคม';
    }
    d[0] = parseInt(d[0]) + 543;
    this.dateForm = d.reverse().join(' ');
    return this.dateForm;
  }

  openDialogVolunteerList(currentActivityId: number) {
    this.dialog.open(AdminVolunteerListComponent);
    let data = { currentActivityId };
    localStorage.setItem('ADMINEVENT', JSON.stringify(data));
  }

  openDialogEditVolunteerList(
    currentActivityId: number,
    currentActivityName: string,
    date: string
  ) {
    this.dialog
      .open(AdminManageVolunteerListComponent)
      .afterClosed()
      .subscribe((result) => {
        this.getDataOnGoingActivity();
      });
    let data = { currentActivityId, currentActivityName, date };
    localStorage.setItem('ADMINEVENT', JSON.stringify(data));
  }


}
