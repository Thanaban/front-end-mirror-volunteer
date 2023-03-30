import { Component,OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/_services/event.service';


@Component({
  selector: 'app-admin-manage-volunteer',
  templateUrl: './admin-manage-volunteer.component.html',
  styleUrls: ['./admin-manage-volunteer.component.css']
})


export class AdminManageVolunteerComponent implements OnInit{
  currentUser: any;
  status:any
  
  form: any = {
    status_event:null
  };

  constructor(private eventService:EventService,private http:HttpClient){

  }


  ngOnInit() {
    this.http.get('http://localhost:8000/activities/get_all_users')
    .subscribe(response => {
      this.currentUser = response;
      if (this.currentUser.non_blacklist == true) {
        this.status = "ปกติ"
      } else {
        this.status = "แบล็คลิสต์"
      }
      // console.warn("result",response)
    })
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


