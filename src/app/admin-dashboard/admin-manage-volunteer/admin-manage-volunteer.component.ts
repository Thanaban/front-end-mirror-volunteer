import { Component,OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/_services/event.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-admin-manage-volunteer',
  templateUrl: './admin-manage-volunteer.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./admin-manage-volunteer.component.css']
})


export class AdminManageVolunteerComponent implements OnInit{
  currentUser: any;
  status:any
  index:any


  form: any = {
    status_event:null
  };

  displayedColumns: string[] = ['position', 'name', 'email', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  constructor(private eventService:EventService,private http:HttpClient){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.http.get('http://localhost:8000/activities/get_all_users')
    .subscribe(response => {
      this.currentUser = response;
      this.index = this.currentUser.length
      if (this.currentUser.non_blacklist == true) {
        this.status = "ปกติ"
      } else {
        this.status = "แบล็คลิสต์"
      }
      // console.warn("result",response)
    })
  }

  change_status(x:boolean){
    if (x == true) {
      this.status = "ปกติ"
    } else {
      this.status = "แบล็คลิสต์"
    }
  }

  update_user_status(currentUserId:number,currentUserStatus:boolean){
    
    this.eventService.status_user(currentUserId,currentUserStatus).subscribe({
      next: test => {
        // console.log(currentEventId);
      },
    
    });
    // this.reloadPage()
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

