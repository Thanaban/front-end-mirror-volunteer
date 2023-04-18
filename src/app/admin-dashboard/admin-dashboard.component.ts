import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminVolunteerListComponent } from './admin-volunteer-list/admin-volunteer-list.component';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  event_all:any
  dateForm:any
  month:any
  afterMonth:string = ""
  userAc = [] as any;

  displayedColumns: string[] = ['date', 'gender', 'birthday','religion'];
  dataSource = new MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http:HttpClient,public dialog: MatDialog){
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/activities/get_lated_activity')
    .subscribe(response => {
      this.event_all = response;
      
      for (let i = 0; i < this.event_all.length;i++){
        if (this.event_all[i].userId.length > 0 ){
          this.event_all[i].date = this.con_date(this.event_all[i].date)
          this.userAc.push(this.event_all[i]);
        }
      }
      this.dataSource = new MatTableDataSource(this.userAc);
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

}
