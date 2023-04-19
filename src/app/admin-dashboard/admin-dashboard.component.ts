import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminVolunteerListComponent } from './admin-volunteer-list/admin-volunteer-list.component';
import {MatTableDataSource} from '@angular/material/table';
import { AdminManageVolunteerListComponent } from './admin-manage-volunteer-list/admin-manage-volunteer-list.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  eventWaitToStartActivity:any
  eventOnGoingActivity:any
  dateForm:any
  month:any
  afterMonth:string = ""
  userAc = [] as any;

  displayedColumns: string[] = ['date', 'gender', 'birthday','volunteer'];
  dataSourceWaitToStartActivity = new MatTableDataSource<any>;
  dataSourceOnGoingActivity = new MatTableDataSource<any>;

  applyFilterWaitToStartActivity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceWaitToStartActivity.filter = filterValue.trim().toLowerCase();
  }

  applyFilterOnGoingActivity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOnGoingActivity.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http:HttpClient,public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/activities/wait_to_start')
    .subscribe(response => {
      this.eventWaitToStartActivity = response;
      
      for (let i = 0; i < this.eventWaitToStartActivity.length;i++){
        if (this.eventWaitToStartActivity[i].userId.length > 0 ){
          this.eventWaitToStartActivity[i].date = this.con_date(this.eventWaitToStartActivity[i].date)
          this.userAc.push(this.eventWaitToStartActivity[i]);
        }
      }
      this.dataSourceWaitToStartActivity = new MatTableDataSource(this.userAc);
    })

    this.http.get('http://localhost:8000/activities/ongoing_activity')
    .subscribe(response2 => {
      this.eventOnGoingActivity = response2;
      
      
      this.dataSourceOnGoingActivity = new MatTableDataSource(this.userAc);
    })
  }

  con_date(d:any){
    d = d.split("-")
    this.month = d[1]
    if (d[1]  == "04"){
      d[1]  = "เมษายน"
    }
    else if(d[1]  == "05"){
      d[1] = "พฤษภาคม"
    }
    d[0] = parseInt(d[0])+543
    this.dateForm = d.reverse().join(" ")
    return this.dateForm
  }

  openDialogVolunteerList(currentActivityId:number) {
    this.dialog.open(AdminVolunteerListComponent);
    let data = {currentActivityId};
    localStorage.setItem('ADMINEVENT',JSON.stringify(data))
  }

  openDialogEditVolunteerList(currentActivityId:number) {
    this.dialog.open(AdminManageVolunteerListComponent);
    let data = {currentActivityId};
    localStorage.setItem('ADMINEVENT',JSON.stringify(data))
  }

}
