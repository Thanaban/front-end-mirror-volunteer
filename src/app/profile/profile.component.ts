import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import { User_show } from './profile-request-get';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public C1: User_show[] = [];
  currentUser: any;
  check_activity: any;
  show_check_activity: any

  constructor(private http:HttpClient,private storageService: StorageService) { 
    
  }
  
  ngOnInit(): void {
    // this.currentUser = this.storageService.getUser();
    this.http.get('http://localhost:8000/users/user')
    .subscribe(response => {
      this.currentUser = response;
      // console.warn("result",response)
    })

    this.http.get('http://localhost:8000/users/get-useractivity')
    .subscribe(response2 => {
      this.check_activity = response2;
      for (let i of this.check_activity){
        console.warn("activityId:",i.activityId)
        this.http.get('http://localhost:8000/activities/getoneid/'+(i.activityId))
        .subscribe(response3 => {
        this.show_check_activity[i] = response3
        console.warn("result3",response3)
    })
      }
      // console.warn("result2",this.check_activity[0].activityId)
    })


  
  }
}
