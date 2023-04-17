import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-volunteer-list',
  templateUrl: './admin-volunteer-list.component.html',
  styleUrls: ['./admin-volunteer-list.component.css']
})
export class AdminVolunteerListComponent implements OnInit {

  constructor(private eventService:EventService){}

  userActivityId: any
  VolunteerList: any

  displayedColumns: string[] = ['name', 'gender', 'birthday','religion', 'phoneNumber','congenitalDisease','allergicFood'];
  dataSource = new MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    let data:any = localStorage.getItem('ADMINEVENT');
    this.userActivityId = JSON.parse(data);
    console.log(this.userActivityId)

    this.eventService.get_user_in_userAc(this.userActivityId.currentActivityId).subscribe({
      next:data => {
        this.VolunteerList = data
        this.dataSource = new MatTableDataSource(this.VolunteerList);
        console.log('test',this.VolunteerList)
      }
    })
  }

}
